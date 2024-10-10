// TODO: 用于模版的生成及添加，可能改变项目文结构 (用于添加区块和模版)
function install(program) {
  program.command('add [mode-name]')
    .description('运行模版或物料添加服务')
    .option('-t, --type <type>', 'Add Type', 'model')
    .option('-b, --branch <type>', 'Add Branch', 'main')
    .action((modename,cmd) => {
      console.log('进入添加物料')
      require('./add')(modename,cmd)
    })
}

// .description('运行开发服务')
// .option('-o, --open', 'Open browser', false)
// .option('-e, --env <type>', 'Run time', 'dev')
// .action((cmd) => {
//   console.log('脚手架执行基础路径', process.cwd())
//   process.env.RUN_ENV = cmd.env
//   process.env.RUN_MODE = 'serve'
//   require('./serve')(cmd)
// })

module.exports = install
