const fs = require('fs');
const ConfigHelp = require('../util/getconfig')
const path = require('path') // 路径处理
const chalk = require('chalk') // 字体变颜色
// const ora = require('ora') // node中的进度条参数
const webpack = require('webpack') // 打包工具webpack
const Config  = require('webpack-chain') // webpack 配置文件管理工具
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成HTML的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清楚文件夹工具
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loade插件
const CopyWebpackPlugin = require('copy-webpack-plugin') // 静态文件复制
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin') // 优化输出插件管理
const WebpackDevServer = require('webpack-dev-server') // 利用webpack
const open = require('opn') // 打开浏览器用的
const DefinePlugin = webpack.DefinePlugin
const basPath = process.cwd() // 基础路径
const configHelp = new ConfigHelp() // 获取配置项信息
/**
 * webpack Config 配置
 */
const config = new Config()
config.mode('development')
config.devtool('eval-source-map')
config.entry('app').add('./src/main.js').end()
// config.stats('errors-only').end() 这块不懂
config.output.path(path.resolve(basPath, `./${configHelp.getBildPaht()}`)).filename('[name].bundle.js').publicPath(configHelp.getPublicPath())
config.resolve.symlinks(false)
config.resolve.alias.set('vue$', `vue/dist/vue.esm.js`)
config.resolve.alias.set('@', path.join(basPath, './src'))
config.resolve.alias.set('@utils', path.join(basPath,'./src/utils'))
config.resolve.alias.set('@assets', path.join(basPath, './src/assets'))
config.resolve.alias.set('@config', path.join(basPath, './src/config'))
// 由于Alias 优先匹配原则故更改别名加载顺序
const dyaliseArry = configHelp.getAlias()
dyaliseArry.forEach(itm => {
  config.resolve.alias.set(`@${configHelp.getAseType()}/${itm}`, path.join(basPath, `@packages/${itm}/index.js`))
})
if (configHelp.getAseType()) {
  config.resolve.alias.set(`@${configHelp.getAseType()}`, path.join(basPath, `./node_modules/@yeezhi/${configHelp.getAseType()}`))
}

// TODO:解析后的地址
// console.log(path.join(basPath, './node_modules/@yeezhi/pcmaterials'))
// config.resolve.alias.set('@pcmaterials/yzpage', path.join(basPath, '@packages/yzpage/index.js'))
// config.resolve.alias.set('@pcmaterials', path.join(basPath, './node_modules/@yeezhi/pcmaterials'))



// 自定义覆盖样式

/**
 * webpck loader 配置
 */

 // 代码检查 eslint-loader
config.module.rule('eslint').test(/\.(js|vue)$/)
  .enforce('pre')
  .include.add(path.resolve(basPath, './src')).end()
  .exclude.add(/node_modules/).end()
  .use('eslint').loader('eslint-loader')
    .options({
      formatter: require('eslint-friendly-formatter')
    })


// ES6+ 解析 babel
config.module.rule('bablets').test(/\.js$/)
  .use('babel').loader('babel-loader')
    .options({
      presets: ['@babel/preset-env'],
      // "transform-vue-jsx"
      plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-syntax-dynamic-import", "transform-vue-jsx",["component",
        {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
        }
      ]]
    }).end()

// 样式编码css_loade
config.module.rule('cssloade').test(/\.css$/)
  .use('style').loader('style-loader').end()
  .use('css').loader('css-loader').options({ sourceMap: true }).end()
  .use('postcss').loader('postcss-loader')
  .options({
    plugins: [require('autoprefixer')({ overrideBrowserslist: configHelp.getBrowser()}), require('postcss-px2rem')({remUnit: configHelp.getRemUnit()})] // https://github.com/browserslist/browserslist 详细配置
  }).end()

config.module.rule('scssload').test(/\.scss$/)
  .use('style').loader('style-loader').end()
  .use('css').loader('css-loader').options({ sourceMap: true }).end()
  .use('postcss').loader('postcss-loader')
    .options({
      plugins: [require('autoprefixer')({ overrideBrowserslist: configHelp.getBrowser()}), require('postcss-px2rem')({remUnit: configHelp.getRemUnit()})]
    }).end()
  .use('scss').loader('sass-loader').options({ sourceMap: true }).end()
  .use('resscss').loader('sass-resources-loader')
    .options({
      sourceMap: true,
      resources: [path.resolve(process.cwd(),'./src/style/variables.scss')] // 后期修改为配置文件读取多文件
    }).end()


// vue 加载器 vue_loader
config.module.rule('vueload').test(/\.vue$/).use('vueload').loader('vue-loader').end()
// svg loader
config.module.rule('svg').test(/\.(svg)(\?.*)?$/)
  .use('svg-sprite-loader').loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    }).end()
// 图片编译方式
config.module.rule('jpg').test(/\.(png|jpe?g|gif)(\?.*)?$/)
  .use('url-loader').loader('url-loader')
    .options({
      limit: configHelp.getLimit(),
      esModule: false,
      name: `${configHelp.getAssetsDirectory()}/img/[name].[hash:7].[ext]`
    }).end()

// 字体文件编译方式
config.module.rule('font').test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
  .use('url-loader').loader('url-loader')
    .options({
      limit: configHelp.getLimit(),
      name: `${configHelp.getAssetsDirectory()}/fonts/[name].[hash:7].[ext]`
    }).end()

// TODO: 拿配置文件报错暂时未解决
// json文件编译和加载方式
// config.module.rule('json').test(/\.json$/).use('json-loader').loader('json-loader').end()

/**
 * webpack plugin
 */
// vue-Loader 插件
config.plugin('vue-load').use(VueLoaderPlugin)

// html文件生产插件
config.plugin('html-create').use(HtmlWebpackPlugin, [{
  template: path.resolve(basPath, './src/index.tp'),
  templateParameters: {
    'BASE_URL': path.resolve(basPath, `./${configHelp.getBildPaht()}`)
  },
  favicon: 'favicon.ico'
}])

const modelImporAry = []
var modeldir = fs.readdirSync(`${basPath}/@modular`)
for (let i = 0; i < modeldir.length; i++) {
  if (modeldir[i] !== '.DS_Store') {
    const impore = require(`${basPath}/@modular/${modeldir[i]}/static/imporpart.js`)
    modelImporAry.push(impore)
  }
}
modelImporAry.push(require(`${basPath}/static/imporpart.js`))
const lastObj = modelImporAry.reduce(function(total, current) {
  return {...total, ...current}
}, {})
const data = `window.funInfo=${JSON.stringify(lastObj)}`

fs.writeFileSync(`${basPath}/static/impor.js`, data, 'utf8')

config.plugin('html-create-script').use(class {
  apply(compiler) {
    compiler.hooks.compilation.tap('HtmlWebpackPluginHooks', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('AddScriptPlugin', (data, cb) => {
          data.html = data.html.replace('</head>','<script src="./static/impor.js"></script></head>')
          cb(null, data)
      })

    })
  }
})

// 清楚html插件
config.plugin('clear-html').use(CleanWebpackPlugin)

// 静态文件拷贝插件
// config.plugin('staicCopy').use(CopyWebpackPlugin, [[{
//   from: path.resolve(basPath, `./${configHelp.getAssetsDirectory()}`),
//   to: path.join(basPath,`./${configHelp.getBildPaht()}/${configHelp.getAssetsDirectory()}`),
//   ignore: ['.*']
// }]])
config.plugin('staicCopy').use(CopyWebpackPlugin, [{
  patterns: [
    {
      from: path.resolve(basPath, `./${configHelp.getAssetsDirectory()}`),
      to: path.join(basPath,`./${configHelp.getBildPaht()}/${configHelp.getAssetsDirectory()}`)
      // ignore: ['.*']
    }
  ]
}])


// 获取所有模块的版本信息
const vaersionary = []
var modeldir = fs.readdirSync(`${basPath}/@modular`)
for (let i = 0; i < modeldir.length; i++) {
  if (modeldir[i] !== '.DS_Store') {
    const impore = require(`${basPath}/@modular/${modeldir[i]}/yezi.js`)
    vaersionary.push(`${modeldir[i]}: %c${impore.version}`)
  }
}
vaersionary.push(`${path.basename(basPath)}:%c${require(`${basPath}/yezi.js`).version}`)
// 全局环境默认对象
config.plugin('DefinePlugin').use(DefinePlugin, [{
  'process.env.RUN_ENV': '\"' + process.env.RUN_ENV + '\"',
  'process.env.PWD': '\"' + process.cwd().replace(/\\/g,'/') + '\"',
  'process.env.version': '\"' + vaersionary.join(',') + '\"',
  'process.env.buidtime': '\"' + new Date().getTime() + '\"',
  'process.env.RUN_BASE': '\"' + process.env.RUN_BASE + '\"',
  'process.env.REM_UNIT': '\"' + configHelp.getRemUnit() + '\"'

}])

// 删除编译多余控制台信息
config.plugin('FriendlyErrorsPlugin').use(FriendlyErrorsWebpackPlugin, [{
  compilationSuccessInfo: {
    messages: [`您的应用已运行 http://${configHelp.getUrl()}:${configHelp.getPort()}`]
  }
}])

/**
 * 具体执行函数
 *
 */
function projectServer (option) {
  console.log(chalk.cyan(' 正在启动开发服务器...\n'))
  let compile = webpack(config.toConfig())
  let serverOption = {
    historyApiFallback: true,
    contentBase: path.resolve(basPath, `./${configHelp.getBildPaht()}`),
    publicPath: '/',
    hot: true,
    overlay: configHelp.getOverlay()
    // TODO: 代理配置详见地址
    // https://github.com/chimurai/http-proxy-middleware
  }
  if (configHelp.getProxyTable()) {
    serverOption.proxy = configHelp.getProxyTable()
  }
  serverOption.quiet = true // 阻止server的输出
  let serverapp = new WebpackDevServer(compile, serverOption)
  serverapp.listen(configHelp.getPort(), configHelp.getUrl(), err => {
    if (err) {
      // TODO: 异常信息的处理
      console.log(err)
      return
    }
    if (option.open) {
      open(`http://${configHelp.getUrl()}:${configHelp.getPort()}`)
    }
  })
}

module.exports = projectServer
