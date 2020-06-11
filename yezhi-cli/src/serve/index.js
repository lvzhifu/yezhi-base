function install(program) {
  program.command('serve')
    .description('运行开发服务')
    .option('-o, --open', 'Open browser', false)
    .option('-e, --env <type>', 'Run time', 'dev')
    .action((cmd) => {
      process.env.RUN_ENV = cmd.env
      process.env.RUN_MODE = 'serve'
      require('./serve')(cmd)
    })
}

module.exports = install
