
import Vue from 'vue'
import router from '@config/router.config'
import ElementUI from 'element-ui'
// css 部分
import './style/icon.scss'
import './style/rest.scss'
Vue.use(ElementUI)
const app = new Vue({
  // i18n,
  router
  // store
}).$mount('#app')
export default app
// console.log(Vue)
// alert('进来了，如果弹出就代表打包成功了')
// const app = new Vue({
//   i18n,
//   router,
//   store
// }).$mount('#app')
