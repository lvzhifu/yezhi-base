function install(program) {
  program.command('test')
    .description('运行测试服务')
    .action(() => {
      console.log('进入测试开发服务')
    })
}

module.exports = install
