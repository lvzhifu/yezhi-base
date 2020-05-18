function install(program) {
  program.command('add [block-name]')
    .description('运行组件或物料添加服务')
    .option('-m, --mode', 'Mode Name', '')
    .action((blockName,cmd) => {
      console.log('进入添加物料')
    })
}

module.exports = install
