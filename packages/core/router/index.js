import Vue  from 'vue'
import Router from 'vue-router'
const routerRule = require.context(`${process.env.PWD}/src`, true, /^\.\/(pages|views)(\/[\w.-]+)?\/router.(js|ts)$/)
const routerRuleModule = require.context(`${process.env.PWD}/@modular`, true, /^\.(\/[\w.-]+)?\/src\/(pages|views)(\/[\w.-]+)?\/router.js/);
console.log(routerRule.keys())
console.log(routerRuleModule.keys())
// 拿到每个模块的 default 导出信息
const modelInfoArry = [...routerRule.keys().map(item => {
  return routerRule(item).default
}),...routerRuleModule.keys().map(item => {
  return routerRuleModule(item).default
})]
console.log(modelInfoArry)
// 获取菜单信息
const localeRouter = (local) => {
  return modelInfoArry.reduce((state, current) => {
    if (!current) {
      return state
    }
    const currentTpRouter = current[local]
    if (currentTpRouter) {
      return state.concat(currentTpRouter)
    }
    return state
  }, [])
}
Vue.use(Router) // vue 路由功能注册
const LayoutCom = require(`${process.env.RUN_BASE === 'base' ? process.env.PWD : `${process.env.PWD}/@modular/${process.env.RUN_BASE}`}/src/layout/index.js`).default
let routes = [] // 配置路由信息
const layoutRouter = {
  path: '/',
  component: LayoutCom,
  children: []
} // 框架页模版路由配置
// 加载根路由
const globalRouters = localeRouter('global')
if (!!globalRouters && globalRouters.length !== 0) {
  routes = routes.concat(globalRouters)
}
const tabRouters = localeRouter('tabs')
if (!!tabRouters && tabRouters.length !== 0) {
  layoutRouter.children = tabRouters
}
routes.push(layoutRouter)
routes.push({
  path: '*',
  redirect: '/login'
})
const router = new Router({
  // mode: 'history', // 可选值： hash、history
  // base: '/voucher',
  routes
})
// 获取原型对象上的push函数
const originalPush = Router.prototype.push
// 修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routdef  = require(`${process.env.RUN_BASE === 'base' ? process.env.PWD : `${process.env.PWD}/@modular/${process.env.RUN_BASE}`}/src/config/router.config.js`).default
function routInstall(Vue, { router, store }) {
  routdef(Vue, router, store)

}
export {
  routInstall,
  router
}



