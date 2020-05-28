import cookie from '@yeezhi/cookie'

export default function install(Vue) {
  Vue.$cookie = Vue.prototype.$cookie = cookie
}
