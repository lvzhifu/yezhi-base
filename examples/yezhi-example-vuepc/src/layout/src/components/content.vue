<template>
  <div class="yzcontent">
    <h1>后台系统模版页</h1>
    <!-- <i class="yz-icon-home"></i> -->
    <i class="el-icon-edit"></i>
    <div class="testcol"></div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  // 组件
  components: {},
  // 组件入参数
  props: {},
  // 数据
  data() {
    return {
    }
  },
  // 计算函数
  computed: {},
  // 节点未挂载事件
  created() {
  },
  // 节点编译完成事件
  mounted() {
  },
  // 可调用方法
  methods: {
  },
  // 数据监听
  watch: {
  }
}
</script>
<style lang="scss">
.yzcontent {
  display: inline-block;
}
</style>
