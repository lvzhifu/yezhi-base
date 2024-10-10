import Vue from 'vue'
// 字段名名称
const fieldName ={
  bind(el, binding) {
    el.oninput = (e) => {
      const rre = /[a-zA-Z0-9]|_/
      const chartArry = e.target.value.split('')
      const newChart = []
      chartArry.forEach((item,idx) => {
        if (rre.test(item) && idx !== 0) {
          newChart.push(item)
        } else if (idx === 0) {
          if (/[a-zA-Z]/.test(item)) {
             newChart.push(item)
          }
        }
      })
      e.target.value = newChart.join('')
      Vue.set(binding.value, binding.arg, e.target.value)
    }
  }
}
// 0～正整数输入
const ordNum = {
  inserted: function (el) {
    el.addEventListener('keypress', function(e) {
      e = e || window.event
      const charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode
      const re = /\d/
      if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }
    })
  }
}

export default function install(Vueins) {
  Vueins.directive('yzFieldnm', fieldName)
  Vueins.directive('yzOrdnum', ordNum)
}
