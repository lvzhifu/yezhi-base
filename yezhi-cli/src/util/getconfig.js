const fs = require('fs');
const path = require('path') // 路径处理
const basPath = process.cwd()
const baseconfig = require(path.join(basPath, './yezi.js'))
const fse = require('fs-extra')

class configHelp{
  constructor(){
  }
  // 获取屏幕
  getRemUnit(){
   return baseconfig.remUnit || 37.5
  }
  // 获取eslint显示
  getOverlay() {
    return baseconfig.overlay || {
      warnings: true,
      errors: true
    }
  }
  // 获取url
  getUrl() {
    return baseconfig.host || 'localhost'
  }
  // 获取端口信息
  getPort() {
    return baseconfig.port || 9001
  }
  // 获取浏览器前缀信息
  getBrowser() {
    return baseconfig.browsers || ['last 7 versions', 'Android >= 4.0', 'iOS >= 6']
  }
  // 获取资源文件
  getAssetsDirectory() {
    return baseconfig.assetsSubDirectory || 'static'
  }
  // 获取build基础路径
  getPublicPath() {
    if (process.env.RUN_MODE === 'serve') {
      return '/'
    }
    return baseconfig.assetsPublicPath || '/'
  }
  // 获取打包文件存放路径
  getBildPaht() {
    return baseconfig.saveFile || 'dist'
  }
  // 获取代理信息
  getProxyTable() {
    return baseconfig.proxyTable
  }
  // 获取Base64转换限制
  getLimit() {
    return baseconfig.limit || 5000
  }
  // 获取覆盖性配置信息
  getAliasArry() {
    return baseconfig.alias || []
  }
  // 获取组件库类型
  getAseType() {
    return baseconfig.aseType || ''
  }
  // 获取覆盖内容信息
  getAlias() {
    return baseconfig.alias || []
  }
  // 获取版本信息
  getVersion() {
    return baseconfig.version || []
  }

  // 静态文件处理
  staticFileHandle() {
    const modularDir = path.join(basPath, '@modular');
    if (!fs.existsSync(modularDir)) {
      console.warn('[!] @modular 目录不存在，跳过静态文件处理');
      return;
    }
    var modeldir = fs.readdirSync(`${basPath}/@modular`)
    for (let i = 0; i < modeldir.length; i++) {
      if (modeldir[i] !== '.DS_Store') {
        const impore = require(`${basPath}/@modular/${modeldir[i]}/yezi.js`)
        if (impore.staticCopy && impore.staticCopy.length !== 0) {
          fileCopy(impore.staticCopy, modeldir[i])
        }
      }
    }
  }
}
function fileCopy(staticCopyArray, modelDir) {
  const srcBase = path.join(basPath, '@modular', `${modelDir}/static`);
  const destBase = path.join(basPath, 'static');

  for (const item of staticCopyArray) {
    const srcPath = path.join(srcBase, item);
    const destPath = path.join(destBase, item);
    console.log(srcPath)
    console.log(destPath)
    try {
      if (fs.existsSync(srcPath)) {
        fse.copySync(srcPath, destPath, { overwrite: true });
        console.log(`[✓] Copied: ${srcPath} → ${destPath}`);
      } else {
        console.warn(`[!] Skip: ${srcPath} not found`);
      }
    } catch (err) {
      console.error(`[✗] Error copying ${srcPath}:`, err.message);
    }
  }
}

module.exports = configHelp
