const routerRule = require.context(`${process.env.PWD}/src`, true, /^\.\/(pages|views)(\/[\w.-]+)?\/router.(js|ts)$/)
// 拿到每个模块的 default 导出信息
const modelInfoArry = routerRule.keys().map(item => {
  return routerRule(item).default
})
// 根据类型获取
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
export default localeRouter
