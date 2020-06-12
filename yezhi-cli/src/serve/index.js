function install(program) {
  program.command('serve')
    .description('运行开发服务')
    .option('-o, --open', 'Open browser', false)
    .option('-e, --env <type>', 'Run time', 'dev')
    .action((cmd) => {
      console.log('脚手架执行基础路径', process.cwd())
      process.env.RUN_ENV = cmd.env
      process.env.RUN_MODE = 'serve'
      require('./serve')(cmd)
    })
}

module.exports = install
