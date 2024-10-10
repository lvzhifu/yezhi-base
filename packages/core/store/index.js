import Vue from 'vue'
import Vuex from 'vuex'
const storeModule = require.context(`${process.env.PWD}/src`, true, /^\.\/(store)(\/[\w.-]+)?\/index.(js|ts)$/)
const storModuleModule = require.context(`${process.env.PWD}/@modular`, true, /^\.(\/[\w.-]+)?\/src\/(store)(\/[\w.-]+)?\/index.js/);
console.log(storeModule.keys())
console.log(storModuleModule.keys())
Vue.use(Vuex)
console.log(...storeModule.keys().map(itm => {
  return storeModule(itm).default
}))
export default new Vuex.Store({
  modules: {
    abc: {
      state: {
        a: 100
      }
    },
    ...storeModule.keys().reduce((rval, itm, idx) => {
      return {...rval, ...storeModule(itm).default}
    }, {}),
    ...storModuleModule.keys().reduce((rval, itm, idx) => {
      return {...rval, ...storModuleModule(itm).default}
    }, {})
  }
})

