// TODO: 用于现有组件覆盖重写
function install(program) {
  program.command('instll [com-name]')
    .description('运行组件覆盖自定义')
    .action((comName) => {
      console.log('进入添加自定义组件功能')
      require('./instal')(comName)
    })
}

module.exports = install
