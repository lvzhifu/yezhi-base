import cookie from '@yeezhi/cookie'
import help from '@yeezhi/help'

export default function install(Vue) {
  Vue.use(cookie.install)
  Vue.use(help)
}
