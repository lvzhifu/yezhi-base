const program = require('commander') // 命令行参数获取
const chalk = require('chalk') // 字体变色chalk
const createInstall = require('../src/create') // 创建指令添加
const serverInstall = require('../src/serve') // 开发服务指令添加
const buildInstall = require('../src/build') // 打包服务指令添加
const testInstall = require('../src/test') // 单元测试服务指令添加
const addInstall = require('../src/add') // 区块添加服务指令添加
const server = require('../')
console.log(process.argv)
console.log(process.execPath)
console.log(process.cwd())
console.log(__filename)
console.log(__dirname)
// 获取当前版本信息
program
  .version(require('../package.json').version)
  .usage('<command> [options]')

// 创建指令插件配置
createInstall(program)

// 服务指令插件配置
serverInstall(program)

// 打包指令插件配置
buildInstall(program)

// 单元测试指令插件配置
testInstall(program)

// 区块添加指令插件配置
addInstall(program)


// 帮助信息整理
program.on('--help', function(){
  console.log(chalk.yellow('  Examples:'))
  console.log(chalk.green('   $ yezhi create test-app'))
  console.log(chalk.green('   $ yezhi server --open'))
  console.log(chalk.green('   $ yezhi test'))
})

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
