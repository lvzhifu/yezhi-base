import * as cookie from '@yeezhi/cookie'
import help from '@yeezhi/help'
import bus from './bus/index'
export default function install(Vue) {
  Vue.$eventBus = Vue.prototype.$eventBus = bus
  Vue.use(cookie.install)
  Vue.use(help)
}
