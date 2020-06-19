/**
 * 1.注册路由组件
 * 2.加载路由信息
 * 3.配置路由导航守卫
 * 4.导出路由
 */
import Vue from 'vue' // 引入vue
import Router from 'vue-router' // 引入vueRouter
import RouterArray from '@yeezhi/core/router/index' // 去中心化路由信息
Vue.use(Router) // vue 路由功能注册
let routes = [] // 配置路由信息
const layoutRouter = {
  path: '/',
  component: {template: '<div><p>我是框架页信息</p><div><router-view></router-view></div></div>'},
  children: []
} // 框架页模版路由配置
// 加载根路由
const globalRouters = RouterArray('global')
if (!!globalRouters && globalRouters.length !== 0) {
  routes = routes.concat(globalRouters)
}
// 加载框架内路由
const tabRouters = RouterArray('tabs')
if (!!tabRouters && tabRouters.length !== 0) {
  layoutRouter.children = tabRouters
}
// 框架页路由及其下级路由
routes.push(layoutRouter)
routes.push({
  path: '*',
  redirect: '/'
})
const router = new Router({
  mode: 'history', // 可选值： hash、history
  // base: '/voucher',
  routes
})


// TODO: 此处配置路由的守卫导航
router.beforeEach(async (to, form, next) => {
  const { meta, fullPath } = to
  next()
})

router.afterEach((to) => {
})

export default router
