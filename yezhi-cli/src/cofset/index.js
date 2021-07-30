function install(program) {
  program.command('config [action]')
    .description('相关信息配置')
    .option('-k, --prive-key [type]', 'set or see gitLab私有key')
    .option('-st, --stor-type [type]', 'set or see 仓库类型')
    .option('-sa, --stor-addre [type]', 'set or see 仓库服务地址')
    .action((action, cmd) => {
      require('./config')(action, cmd)
    })
}
module.exports = install
