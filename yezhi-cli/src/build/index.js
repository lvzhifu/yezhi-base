function install(program) {
  program.command('build')
    .description('打包您的服务')
    .option('-e, --env <type>', 'Run time', 'pro')
    .option('-t, --test <type>', 'Run time')
    .action((cmd) => {
      console.log('进入打包服务')
    })
}

module.exports = install
