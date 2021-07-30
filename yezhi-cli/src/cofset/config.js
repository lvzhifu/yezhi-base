const chalk = require('chalk') // 字体变颜色
const fs = require('fs')
const path = require('path') // 路径处理
const configObj = require('../../yconf.json')
const configFile = path.resolve(__dirname, '../../yconf.json')
/**
 * 对外执行函数
 */
function configDeploy(action, option) {
  if (action === 'get') {
    getConfig(option)
  } else {
    setConfig(option)
  }
}

function getConfig(option) {
  const isSet = option.storType || option.priveKey || option.storAddre
  const outArry = []
  outArry.push(`仓库类型:${configObj.storType}`)
  outArry.push(`仓库私钥匙:${configObj.priveKey}`)
  outArry.push(`仓库地址:${configObj.storAddre}`)
  outArry.forEach((item, idx) => {
    if (isSet) {
      if(idx === 0 && option.storType) {
        console.log(chalk.bgBlue(item))
      }
      if(idx === 1 && option.priveKey) {
        console.log(chalk.bgBlue(item))
      }
      if(idx === 2 && option.storAddre) {
        console.log(chalk.bgBlue(item))
      }
    } else {
      console.log(chalk.bgBlue(item))
    }
  })
}

function setConfig(option) {
  /**
   * TODO: 写入配置文件方法
   */
  if (option.storType) {
    configObj.storType = option.storType
  }
  if (option.priveKey) {
    configObj.priveKey = option.priveKey
  }
  if (option.storAddre) {
    configObj.storAddre = option.storAddre
  }
  fs.writeFile(configFile, JSON.stringify(configObj), err => {
  } )
}

module.exports = configDeploy
