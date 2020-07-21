<template>
  <div>
    <yzhead/>
    <h1>后台系统模版页</h1>
    <!-- <i class="yz-icon-home"></i> -->
    <i class="el-icon-edit"></i>
    <div class="testcol"></div>
    <router-view></router-view>
  </div>
</template>
<script>
import yzhead from './components/head.vue'
console.log(yzhead)
export default {
  components: {
    yzhead
  }
}
</script>
<style lang="scss">
.testcol {
  width: 200px;
  height: 40px;
  color: $yz-primarycol;
}
</style>
