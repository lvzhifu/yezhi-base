const ConfigHelp = require('../util/getconfig')
const path = require('path') // 路径处理
const chalk = require('chalk') // 字体变颜色
const ora = require('ora') // node中的进度条参数
const webpack = require('webpack') // 打包工具webpack
const Config  = require('webpack-chain') // webpack 配置文件管理工具
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成HTML的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清楚文件夹工具
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loade插件
const CopyWebpackPlugin = require('copy-webpack-plugin') // 静态文件复制
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin') // 优化输出插件管理
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css 提取插件防止包过大
const optimizeCss = require('optimize-css-assets-webpack-plugin') // css 压缩
// const { runCLI } = require('jest') // 获取jest 测试运行器
const DefinePlugin = webpack.DefinePlugin
const basPath = process.cwd() // 基础路径
const configHelp = new ConfigHelp() // 获取配置项信息
// console.log(webpack.optimize.CommonsChunkPlugin)

/**
 * webpack Config 配置
 */
const config = new Config()
config.mode('production')
config.entry('app').add('./src/index.js').end()
config.output.path(path.resolve(basPath, `./${configHelp.getBildPaht()}`)).filename(`${configHelp.getAssetsDirectory()}/js/[name].[chunkhash:8].js`).publicPath(configHelp.getPublicPath())
config.resolve.alias.set('vue$', `vue/dist/vue.esm.js`)
config.resolve.alias.set('@', path.join(basPath, './src'))
config.resolve.alias.set('@utils', path.join(basPath,'./src/utils'))
config.resolve.alias.set('@assets', path.join(basPath, './src/assets'))
config.resolve.alias.set('@config', path.join(basPath, './src/config'))



/**
 * webpck loader 配置
 */
config.module.rule('eslint').test(/\.(js|vue)$/)
  .enforce('pre')
  .include.add(path.resolve(basPath, './src')).end()
  .exclude.add(/node_modules/).end()
  .use('eslint').loader('eslint-loader')
    .options({
      formatter: require('eslint-friendly-formatter')
    })

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

/**
 * 1. 判断是否启用相对性路径
 */
const cssExtraOption = {}
if (configHelp.getPublicPath() === './') {
  cssExtraOption.publicPath = '../../'
}
// TODO: 由于当前没有试用移动端待需要添加配置移动端自适应方案
// require('postcss-px2rem')({remUnit: configHelp.getRemUnit()})
config.module.rule('cssloade').test(/\.css$/)
  .use('style').loader(MiniCssExtractPlugin.loader).options(cssExtraOption).end()
  .use('css').loader('css-loader').end()
  .use('postcss').loader('postcss-loader')
    .options({
      plugins: [require('autoprefixer')({ overrideBrowserslist: configHelp.getBrowser()})] // https://github.com/browserslist/browserslist 详细配置
    }).end()

// TODO: 目前仅支持SCSS 处理，后期处理为配置 less SCSS
config.module.rule('scssload').test(/\.scss$/)
  .use('style').loader(MiniCssExtractPlugin.loader).options(cssExtraOption).end()
  .use('css').loader('css-loader').options({ sourceMap: true }).end()
  .use('postcss').loader('postcss-loader')
    .options({
      plugins: [require('autoprefixer')({ overrideBrowserslist: configHelp.getBrowser()})]
    }).end()
  .use('scss').loader('sass-loader').options({ sourceMap: true }).end()
  .use('resscss').loader('sass-resources-loader')
    .options({
      sourceMap: true,
      resources: [path.resolve(process.cwd(),'./src/style/variables.scss')] // 后期修改为配置文件读取多文件
    }).end()

// config.module.rule('lessload').test(/\.less$/)
// .use('style').loader(MiniCssExtractPlugin.loader).end()
//   .use('css').loader('css-loader').end()
//   .use('postcss').loader('postcss-loader')
//     .options({
//       plugins: [require('autoprefixer')({ overrideBrowserslist: configHelp.getBrowser()})]
//     }).end()
//   .use('less').loader('less-loader')
//     .options({
//       sourceMap: true
//     }).end()
config.module.rule('vueload').test(/\.vue$/).use('vueload').loader('vue-loader').end()

config.module.rule('jpg').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  .use('url-loader').loader('url-loader')
    .options({
      limit: configHelp.getLimit(),
      name: `${configHelp.getAssetsDirectory()}/img/[name].[hash:7].[ext]`
    }).end()

config.module.rule('font').test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
  .use('url-loader').loader('url-loader')
    .options({
      limit: configHelp.getLimit(),
      name: `${configHelp.getAssetsDirectory()}/fonts/[name].[hash:7].[ext]`
    }).end()

// TODO: 拿配置文件报错暂时未解决
// config.module.rule('json').test(/\.json$/).use('json-loader').loader('json-loader').end()
/**
 * optimization
 */
config.optimization.splitChunks({
  chunks: 'all',
  cacheGroups: {
    libs: {
      name: 'chunk-libs',
      test: /[\\/]node_modules[\\/]/,
      priority: 10,
      chunks: 'initial' // 只打包初始时依赖的第三方
    },
    elementUI: {
      name: 'chunk-elementUI', // 单独将 elementUI 拆包
      priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
      test: /[\\/]node_modules[\\/]element-ui[\\/]/
    }
  }
})


/**
 * webpack plugin
 */
config.plugin('vue-load').use(VueLoaderPlugin)

config.plugin('cssfl').use(MiniCssExtractPlugin, [{
  filename: `${configHelp.getAssetsDirectory()}/css/[name].[contenthash:7].css`
}])

config.plugin('compressCSS').use(optimizeCss, [{
  assetNameRegExp: /\.css$/g,
  cssProcessor: require('cssnano'),
  canPrint: true
}])

config.plugin('staicCopy').use(CopyWebpackPlugin, [{
  patterns: [
    {
      from: path.resolve(basPath, `./${configHelp.getAssetsDirectory()}`),
      to: path.join(basPath,`./${configHelp.getBildPaht()}/${configHelp.getAssetsDirectory()}`)
      // ignore: ['.*']
    }
  ]
}])

config.plugin('DefinePlugin').use(DefinePlugin, [{
  'process.env.RUN_ENV': '\"' + process.env.RUN_ENV + '\"',
  'process.env.PWD': '\"' + process.cwd().replace(/\\/g,'/') + '\"'
}])

config.plugin('html-create').use(HtmlWebpackPlugin, [{
  template: path.resolve(basPath, './src/index.tp'),
  templateParameters: {
    'BASE_URL': path.resolve(basPath, `./${configHelp.getBildPaht()}`)
  },
  favicon: 'favicon.ico'
}])

config.plugin('clear-html').use(CleanWebpackPlugin)

// 删除编译多余控制台信息
config.plugin('FriendlyErrorsPlugin').use(FriendlyErrorsWebpackPlugin)


// 导出打包函数  TODO: 前端单元测试方案待定
function projectBuild (option) {
  // let LastCarryOut = new Date(1581324884801)
  // console.log('已变更')
  // let nowDate = new Date()
  // if (LastCarryOut < nowDate) {
  //   console.log(chalk.red(' 打包服务异常请联系：吕致富：13718208603'))
  //   return
  // }
  // TODO: 目前无回归测试方案删除相关逻辑代码
  // if (option.test) {
  //   runCLI({}, ['tests']).then(obj => {

  //     if(obj.results.success) {
  //       console.log(chalk.green('测试通过允许执行打包'))
  //       fileBuild()
  //     } else {
  //       console.log(chalk.red('测试未通过暂停打包'))
  //     }
  //   })
  // } else {
  //   fileBuild()
  // }
  fileBuild()
}
//
function fileBuild () {
  const spinner = ora('build 开始...')
  spinner.start()
  let compile = webpack(config.toConfig())
  compile.run((err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    console.log(chalk.cyan('  Build 完成.\n'))
    console.log(chalk.yellow('  Tip: 请在nginx 下访问 直接打开的方式不可以哦.\n'))
  })
}
module.exports = projectBuild
