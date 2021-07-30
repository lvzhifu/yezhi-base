const chalk = require('chalk') // 字体变颜色
const download = require('download-git-repo') // 模板下载使用
const ora = require('ora') // node中的进度条参数
const axios = require('axios')
const configObj = require('../../yconf.json')
var inquirer = require('inquirer')
var PrJName = null

function createProject(projName) {
  PrJName = projName
  getProjects()
}
// 获取模版项目信息
async function getProjects() {
  const res = await axios({
    method: 'GET',
    headers: {
      'PRIVATE-TOKEN': configObj.priveKey
    },
    url: `${configObj.storAddre}/api/v3/projects`
  })
  const optArry = res.data.map(item => {
    return item.path_with_namespace
  })
  getUseSel(optArry)
}
// 设置用户选择
async function getUseSel(optArry) {
  const res = await inquirer.prompt([
    {
      type:'list',
      message:'请选择一个项目模版：',
      name:'prjtmp',
      choices: optArry
    }
  ])
  dowProj(res.prjtmp)
}
// 下载并生成项目
function dowProj(tmpName) {
  const spinner = ora(`Loading ${chalk.red('Download in progress')}`).start()
  spinner.color = 'green'
  download(`direct:${configObj.storAddre}/${tmpName}.git`, PrJName, { clone: true }, function (err) {
    console.log(err ? '模板加载错误' : '模板加载结束');
    if(err !== 'Error') {
      console.log('创建成功')
      spinner.succeed()
    }
  })
}

module.exports = createProject
