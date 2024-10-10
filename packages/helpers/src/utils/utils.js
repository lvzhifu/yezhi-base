/**
 *
 * 日期格式化
 * @export
 * @param {any} val 时间值
 * @param {any} format  格式化规则 yyyy-MM-dd
 */
function dateFormat (val, format) {
  if (!val) {
    return ''
  }
  let date = new Date(val)
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}

function setRemInit () {
 // postcss-px2rem的内容
  // 基准大小
  const baseSize = (process.env.REM_UNIT * 1)
  // 设置 rem 函数
  function setRem () {
    // 当前页面宽度相对于 1920 px(设计稿尺寸)的缩放比例，可根据自己需要修改。
    // > 750 ? 750 : document.documentElement.clientWidth
    const maxWidth = document.documentElement.clientWidth
    const scale = maxWidth / (process.env.REM_UNIT * 10)
    // 设置页面根节点字体大小
    document.documentElement.style.fontSize = `${baseSize * scale}px`
    // 这个if语句代码，是用来控制屏幕的最小宽度，不需要可以可以不写
    // if (Number(document.documentElement.style.fontSize.slice(0, -2)) <= 130) {
    //   document.documentElement.style.fontSize = '130px';
    // }
  }
  // 初始化
  setRem()
  // 改变窗口大小时重新设置 rem
  window.addEventListener('resize', setRem)
}

export default {
  dateFormat,
  setRemInit
}
