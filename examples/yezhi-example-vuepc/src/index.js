
import Vue from '@yeezhi/core/node_modules/vue/dist/vue.esm'
console.log(Vue)

import router from '@config/router.config' // 路由信息
console.log(router)
const app = new Vue({
  // i18n,
  router,
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
