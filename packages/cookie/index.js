import cookie from 'arale-cookie'

export { cookie }

export function install(Vue) {
  Vue.$cookie = Vue.prototype.$cookie = cookie
}
