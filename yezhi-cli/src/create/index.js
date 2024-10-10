function install(program) {
  program.command('create <app-name>')
    .description('创建您的项目')
    .action((projectName, cmd) => {
      // console.log('进入项目创建功能')
      // console.log(projectName)
      // console.log(cmd)
      require('./creade')(projectName)

    })
}

module.exports = install
