import utils from './src/utils/utils.js'
import directivesInstall from './src/directive/index.js'
export default function install(Vue) {
  // TODO: 引入vue全局指令、mixins、$util函数式工具
  Vue.$util = Vue.prototype.$util = utils
  Vue.use(directivesInstall)
}
