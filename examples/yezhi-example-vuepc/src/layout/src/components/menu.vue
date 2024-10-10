<template>
  <el-menu class="yzmenu"
    :collapse="iscollapse">
    <el-menu-item index="1"><i class="el-icon-location"></i>
      <span slot="title">导航一</span></el-menu-item>
    <el-menu-item index="2"><i class="el-icon-location"></i>
      <span slot="title">导航二</span></el-menu-item>
    <el-menu-item index="3"><i class="el-icon-location"></i>
      <span slot="title">导航三</span></el-menu-item>
    <el-menu-item index="4"><i class="el-icon-location"></i>
      <span slot="title">导航四</span></el-menu-item>
  </el-menu>
</template>
<script>
import MenuArray from '@/config/menu.config.js'
console.log(MenuArray)
export default {
  // 组件
  components: {},
  // 组件入参数
  props: {},
  // 数据
  data() {
    return {
      iscollapse: false
    }
  },
  // 计算函数
  computed: {},
  // 节点未挂载事件
  created() {
    this.$eventBus.$on('menueshar', (iscop) => {
      this.iscollapse = iscop
    })
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
.yzmenu {
  // position: relative;
  // top: -1px;
  display: inline-block;
  box-sizing: border-box;
  width: 241px;
  height: calc(100% - 41px);
  background-color: $yz-primarycol;
  // border-top: 1px solid #2d6aab;
  &.el-menu--collapse {
    width: 61px;
  }
  & .el-menu-item {
    font-size: 18px;
    color: #ffffff;
    &:hover {
      background-color: #3653bb;
    }
  }
   & .el-menu-item.is-active {
    background-color: #3653bb;
    color: #ffffff;
  }
  & .el-menu-item i {
    color: #ffffff;
  }
  & .el-menu-item.is-active i {
    color: #02fed1;
  }
}
</style>
