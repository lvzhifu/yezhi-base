const chalk = require('chalk') // 字体变颜色
const ora = require('ora') // node中的进度条参数
const axios = require('axios')
const configObj = require('../../yconf.json')
const inquirer = require('inquirer')
const path = require('path') // 路径处理
const basPath = process.cwd() // 基础路径
const fs = require('fs');
const unzipper = require('unzipper')
const { spawn } = require('child_process')

// 获取以来模块信息
async function getModula(modename, cmd) {
  /**
   * 1. 通过配置的访问令牌，获取所有的项目信息并筛选出项目ID
   * 2. 构建下载地址 例： http://192.168.1.40:3000/api/v4/projects/133/repository/archive?sha=main
   * 3. 解压下载压缩包到目录
   * 4. 删除压缩包
   * 6. 添加依赖
   * 7. 更新import.js (移动到项目打包时生成)
   * 8. 流程结束
   */
  const spinner = ora('正在查找模块请稍等...').start()
  const projectsres = await axios({
    method: 'GET',
    headers: {
      'PRIVATE-TOKEN': configObj.priveKey
    },
    url: `${configObj.storAddre}/api/v4/projects`
  })
  const searchProjects = projectsres.data.filter((item) => {
    return item.name === modename
  })
  if (searchProjects.length === 0) {
    spinner.stop('error')
    console.log(chalk.red('未找到该模块'))
    return
  }
  const projectId = await getProjectID(searchProjects)
  spinner.succeed('查找成功-模块ID: ' + projectId)
  const modelpath = await downloadModuals(modename, projectId, cmd.branch)
  const modeConfigObj = require(path.join(basPath, `${modelpath}/yezi.js`))
  console.log(modeConfigObj.treeParty)
  // 添加第三方依赖
  modeConfigObj.treeParty.forEach((item) => {
    const commandArgs = configObj.pmTool === 'yarn' ? ['add', item] : ['install', item]
    addDependencies(configObj.pmTool, commandArgs)
})

  // TODO: 开始添加依赖
  // exec(command, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`执行出错: ${error}`);
  //     return;
  //   }
  //   if (stderr) {
  //     console.error(`命令错误输出: ${stderr}`);
  //     return;
  //   }
  //   console.log(`命令输出: ${stdout}`);
  // });

}
// 获取模块信息
function getUnit(commandNmae, cmd) {

}

// 安装三方依赖模块
function addDependencies (command, commandArgs) {
  const child = spawn(command, commandArgs,{})
  // 监听 stdout 和 stderr 的数据事件
  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  })

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  })

  // 监听 close 事件以获取退出码
  child.on('close', (code) => {
    console.log(`子进程退出，退出码 ${code}`);
  })

  // 如果你想要捕获错误事件（例如，如果无法执行命令）
  child.on('error', (error) => {
    console.error(`执行命令时发生错误: ${error}`);
  })
}

// 下载模块并解压模块
function downloadModuals(modename, modelid, branch) {
  return new Promise(async (resolve, reject) => {
    const spinner = ora('正在下载模块请稍等...').start()
    const modelzip = await axios({
      method: 'GET',
      headers: {
        'PRIVATE-TOKEN': configObj.priveKey
      },
      responseType: "stream",
      url: `${configObj.storAddre}/api/v4/projects/${modelid}/repository/archive.zip?sha=${branch}`
    })
    modelzip.data.pipe(unzipper.Extract({ path: `./@modular` }))
    .on('close', () => {
      const files = fs.readdirSync(`./@modular`)
      files.forEach(async (item) => {
        if (item.includes(modename)) {
          fs.rename(`./@modular/${item}`, `./@modular/${modename}`, (err) => {
            if (err) throw err;
            console.log('文件夹名称已更改！')
            resolve(`./@modular/${modename}`)
          })
        }
      })
      spinner.succeed('下载并解压成功')
    })

  })
}

// 获取项目ID
function  getProjectID(projs) {
  return new Promise(async (resolve, reject) => {
    if (projs.length === 1) {
      // 只找到一个项目，直接返回
      resolve(projs[0].id)
    } else {
      // 找到多个项目，需要用户选择
      const res = await inquirer.createPromptModule([
        {
          type: 'list',
          message: '请选择模块',
          name: modelid,
          choices: projs.map(itm => {
            return {
              name: itm.path_with_namespace,
              value: itm.id
            }
          })
        }
      ])
      resolve(res.modelid)
    }
  })
}

function addModuals(modename, cmd) {
  if(cmd.type === 'model') {
    getModula(modename, cmd)
  }
  if (cmd.type === 'unit') {
    getUnit(commandName, cmd)
  }
  console.log('开始添加模块')
  console.log(modename)
  console.log(cmd.type)
  console.log(cmd.branch)
}

module.exports = addModuals
