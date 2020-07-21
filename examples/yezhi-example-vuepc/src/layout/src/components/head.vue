<template>
  <header class="yzhead">
    <span class="yzhead-name">
      <img src="@assets/img/logo1.png"/>
      <span>Yezhi</span>
    </span>
    <span class="yzhead-shrink" @click="tstshrink">
      <i class="yz-icon-menushrink"></i>
    </span>
    <input>
    <aside>
      提醒消息区
    </aside>
    <el-dropdown trigger="click">
      <span>
        小渣渣<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
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
    console.log('jl')
    this.$eventBus.$on('ttttshrink', () => {
      // eslint-disable-next-line no-debugger
      debugger
      console.log('响应进来了。')
    })
  },
  // 节点编译完成事件
  mounted() {
  },
  // 可调用方法
  methods: {
    tstshrink() {
      // eslint-disable-next-line no-debugger
      debugger
      this.$eventBus.$emit('ttttshrink', 'adf')
    }
  },
  // 数据监听
  watch: {

  }
}
</script>
<style lang="scss">
.yzhead {
  height: 40px;
  line-height: 40px;
  // border: 1px solid red;
  background-color: #FFF;
  box-shadow: 2px 3px 8px #f0eff4;
  border-bottom: 1px solid #f0eff4;
  &-name {
    display: inline-block;
    box-sizing: border-box;
    width: 240px;
    padding-left: 10px;
    background-color:$yz-primarycol;
    color: #FFF;
    transition: all .3s;
    // border: 1px solid ;
    box-shadow: 2px 0px 8px #f0eff4;
    & img {
      height: 40px;
      vertical-align: bottom;
    }
    &[smal] {
      width: 60px;
    }
  }
  &-shrink {
    margin-left: 10px;
    vertical-align: sub;
    & .yz-icon-menushrink {
      font-size: 25px;
    }
  }
}
</style>
