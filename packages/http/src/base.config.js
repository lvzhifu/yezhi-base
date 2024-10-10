// axios初始化基础配置信息
const axiosConfig = {
  timeout: 30000, // 请求超时事件
  withCredentials: true, // 跨域请求允许携带cookie
  changeOrigin: true, // 设定允许跨域
  validateStatus (status) {
    return status >= 200 && status <= 500
  } // 请求正确响应值范围
}
// 基础扩展配置
const requestConfig = {
  isAutoMsg: true, // 自动弹框
  isLoading: true, // TODO: 自动等待提示(缺少等待队列信息)，由于使用架构的不同暂无好的办法考虑插件注入方式
  isApiHost: true, // 判定路由是否增加前缀
  baseUrl: '/api' // 默认的基础前缀
}

// axios request succes hook TODO: 有时间添加通用的默认请求钩子
function requestResolve (config) {
  return config
}

// axios request err hook
function requestReject (err) {
  Promise.reject(err)
}

// axios response succes hook
function responseResolve (response) {
  return respons
}

// axios response err hook
function responseReject (err) {
  Promise.reject(err)
}

export {
  axiosConfig,
  requestConfig,
  requestResolve,
  requestReject,
  responseResolve,
  responseReject
}
