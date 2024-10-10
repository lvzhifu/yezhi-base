function install(program) {
  program.command('kftst')
    .description('脚手架测试')
    .option('-b, --base <type>', '基础框架', 'base')
    .action(async (cmd) => {
      // const answer = await getInput('请确认您的基础框架项目: ');
      console.log('kkkk:',cmd.env)
      console.log('脚手架执行基础路径', process.cwd())
      process.env.RUN_ENV = cmd.env
      process.env.RUN_MODE = 'serve'
      process.env.RUN_BASE = cmd.base
      require('./kftst')(cmd)
    })
}
// 定义异步获取输入的函数
async function getInput(query) {
  // 使用readline来获取用户输入
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}
module.exports = install
