
import {
  axiosConfig,
  requestConfig,
  requestResolve,
  requestReject,
  responseResolve,
  responseReject
} from './base.config'
import initAxios from './init.axios'
function Http (options = {}) {
  this.init(options)
}
// 插件引入函数
Http.use = function (plugin) {
  if (typeof plugin.install === 'function') {
    plugin.install.apply(plugin, [this])
  } else if (typeof plugin === 'function') {
    plugin.apply(null, [this])
  }
  return this
}
// 基础配置信息初始化
Http.prototype.options = {
  axiosConfig: axiosConfig,
  requestConfig: requestConfig,
  axiosHook: {
    $requestResolve: requestResolve,
    $requestReject: requestReject,
    $responseResolve: responseResolve,
    $responseReject: responseReject
  }
}
// 初始化axios
initAxios(Http)
// 初始化信息处理函数
Http.prototype.init = function(options) {
  const axiosConfig = {...this.options.axiosConfig, ...options.axiosConfig}
  const requestConfig = {...this.options.axiosConfig, ...options.axiosConfig}
  const axiosHook = {...this.options.axiosHook, ...options.axiosHook}
  this.options = {
    axiosConfig,
    requestConfig,
    axiosHook
  }
}
// 版本号信息设置
Http.version = require('../package.json').version
export default Http
