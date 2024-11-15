// import * as cookie from '@yeezhi/cookie'
// import help from '@yeezhi/help'
// import bus from './bus/index'
// export default function install(Vue) {
//   Vue.$eventBus = Vue.prototype.$eventBus = bus
//   Vue.use(cookie.install)
//   Vue.use(help)
// }
import Vue from 'vue'
import { router, routInstall } from './router/index.js'
import store from './store/index.js'
import * as cookie from '@yeezhi/cookie'
import help from '@yeezhi/help'
import bus from './bus/index'
const versionArry = process.env.version.split(',')
versionArry.forEach(itm => {
  console.log(itm,'color:red')
})
const indexArry = require.context(`${process.env.PWD}/src`, true, /^\.\/index.(js|ts)$/)
const indexArryModule = require.context(`${process.env.PWD}/@modular`, true, /^\.(\/[\w.-]+)?\/src\/index.js/);
Vue.$eventBus = Vue.prototype.$eventBus = bus
Vue.use(cookie.install)
Vue.use(help)
if (process.env.REM_UNIT) {
 Vue.$util.setRemInit()
}
indexArry.keys().forEach(itm => {
 Vue.use(indexArry(itm).default)
})
indexArryModule.keys().forEach(itm => {
 Vue.use(indexArryModule(itm).default)
})
Vue.use(routInstall, {
  router,
  store
})
const app = new Vue({
  // i18n,
  router,
  store
}).$mount('#app')
export default app
