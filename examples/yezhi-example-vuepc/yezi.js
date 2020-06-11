module.exports = {
  remUnit: 37.5, // 设计图的总宽度是以750px为标准，则填写75；如果是375px，则填写37.5；以此类推
  // eslit 错误展示
  overlay: {
    warnings: true,
    errors: true
  },
  // url信息
  host: '0.0.0.0',
  // 端口信息
  port: 9001,
  // 浏览器前缀信息
  browsers: ['last 7 versions', 'Android >= 4.0', 'iOS >= 6'],
  // 资源文件夹
  assetsSubDirectory: 'static',
  // build 基础路径
  // assetsPublicPath: '/',
  // build 存放文件夹
  saveFile: 'dist',
  limit: 500,
  // https://github.com/chimurai/http-proxy-middleware
  proxyTable: {
    '/api': {
      // target: 'http://192.168.7.221:6601',
      target: 'http://my-dev.bysrd.cn/api/v1/toc',
      changeOrigin: true,
      pathRewrite: {
        '/api': ''
      }
    },
    '/qt': {
      target: 'http://my-dev.bysrd.cn/api/v1/auth',
      changeOrigin: true,
      pathRewrite: {
        '/qt': ''
      }
    }
  }
}
