const basPath = process.cwd()
console.log(basPath)
const routerRule = require.context('../../', true, /^\.\/(pages|views)(\/[\w.-]+)?\/router.(js|ts)$/)
