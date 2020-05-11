import axios from 'axios'

// 初始化请求功能组册
export default function initAxios(Http) {
  // 初始化访问服务函数
  Http.prototype.initServer = function () {
    if (this.$fetch) {
      return
    }
    this.$fetch = createAxios(this.options.axiosConfig, this.options.axiosHook)
  }
  /**
   * get 提交
   * @param {String} url 请求的url
   * @param {any} params  请求的参数
   * @param {Boolean} isApiHost  是否添加前缀 默认是true
   * @param {Obejct} config  请求配置
   * @returns Promise
   */
  Http.prototype.get = function (url, params = {}, config = {}) {
    const opts = {...this.requestConfig, ...config}
    opts.params = params
    this.initServer()
    return this.$fetch.get(getUrl(url, opts.isApiHost, opts.baseUrl), opts)
  }
  /**
   * delete 操作
   */
  Http.prototype.del =  function (url, params = {}, config = {}) {
    const opts = {...this.requestConfig, ...config}
    opts.params = params
    this.initServer()
    return this.$fetch.delete(getUrl(url, opts.isApiHost, opts.baseUrl), opts)
  }
  /**
   * post 操作
   */
  Http.prototype.post =  function (url, params = {}, config = {}) {
    const opts = {...this.requestConfig, ...config}
    this.initServer()
    return this.$fetch.post(getUrl(url, opts.isApiHost, opts.baseUrl), params, opts)
  }
  /**
   * patch 提交
   */
  Http.prototype.patch = function (url, params = {}, config = {}) {
    const opts = {...this.requestConfig, ...config}
    this.initServer()
    return this.$fetch.patch(getUrl(url, opts.isApiHost, opts.baseUrl), params, opts)
  }
  /**
   * put 提交
   */
  Http.prototype.put = function (url, params = {}, config = {}) {
    const opts = {...this.requestConfig, ...config}
    this.initServer()
    return this.$fetch.patch(getUrl(url, opts.isApiHost, opts.baseUrl), params, opts)
  }
  /**
   * 上传函数处理
   */
  Http.prototype.upload = function (url, params = {}, config = {}, axiosCancel = {}) {
    const POST_HEADER = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }
    const opts = {...this.requestConfig, ...POST_HEADER, ...config}
    const form = new FormData()
    Object.keys(params).forEach(key => {
      form.append(key, params[key])
    })
    const CancelToken = axios.CancelToken
    axiosCancel.source = CancelToken.source()
    opts.cancelToken = axiosCancel.source.token
    this.initServer()
    return this.$fetch.post(getUrl(url, opts.isApiHost, opts.baseUrl), form, opts)
  }
  /**
   * 生成下载路径
   */
  Http.prototype.downloadUrl = function (url, params = {}, config = {}) {
    const opts = {...this.requestConfig, ...config}
    const paramsArry = []
    for (const item in params) {
      paramsArry.push(`${item}=${params[item]}`)
    }
    const res = `${getUrl(url, opts.isApiHost, opts.baseUrl)}?1=1&${paramsArry.join('&')}`
    return res
  }
  /**
   * 创建form提交使用的表单
   */
  Http.prototype.createForm = function(url, params = {}, config = {}) {
    const opts = {...this.requestConfig, ...config}
    const form = document.createElement('form')
    form.setAttribute('hidden', 'hidden')
    form.setAttribute('method', 'post')
    form.setAttribute('action', getUrl(url, opts.isApiHost, opts.baseUrl))
    for (const item in params) {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', item)
      input.setAttribute('value', params[item])
      form.appendChild(input)
    }
    return form
  }
}

// TODO: 初始化axios 功能完善后考虑移出
function createAxios(config, hook) {
  /**
   * 请求配置
   * @see https://github.com/mzabriskie/axios
   */
  const service = axios.create(config)
  service.interceptors.request.use(config => {
    hook.$requestResolve(config)
    return config
  }, error => {
    hook.$requestReject(error)
  })
  service.interceptors.response.use(
    response => {
      return hook.$responseResolve(response)
    },
    error => {
      return hook.$responseReject(error)
    }
  )
  return service
}

/**
 *
 * url 处理如果 isApiHost 为true 则添加 API_HOST
 * @param {any} url 访问路径
 * @param {any} isApiHost 是否添加请求前缀
 * @param {any} baseUrl 基础路径
 * @returns
 *
 */
function getUrl(url, isApiHost, baseUrl) {
  if (!isApiHost) {
    return url
  }
  const arr = []
  arr.push(baseUrl)
  arr.push(url)
  return arr.join('')
}
