<template>
  <header class="yzhead">
    <span class="yzhead-name" :smal="isShrink">
      <!-- <span>abcdefghijklmnopqrstuvwxyz</span> -->
      <img src="@assets/img/logo1.png"/>
      <span>Yezhi</span>
    </span>
    <span class="yzhead-shrink" :smal="isShrink" @click="expandOrShrinkEvent">
      <i class="yz-icon-menushrink"/>
    </span>
    <div class="yzhead-ipt">
      <i class="yz-icon-headsearch"/>
      <input/>
    </div>
    <el-dropdown class="yzhead-uinfo" trigger="click">
      <div>
        <el-avatar size="small" icon="el-icon-user-solid" style="vertical-align: middle;"></el-avatar>
        <span>
          小渣渣<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <aside class="yzhead-remind">
      <el-badge :value="200" :max="99" class="reminditm">
        <i class="yz-icon-talk"/>
      </el-badge>
      <el-badge :value="5" :max="99" class="reminditm">
        <i class="yz-icon-remind"/>
      </el-badge>
    </aside>
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
      isShrink: false // 是否缩小
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
    // 菜单区展开或收缩事件
    expandOrShrinkEvent() {
      this.isShrink = !this.isShrink
      this.$eventBus.$emit('menueshar', this.isShrink)
    }
  },
  // 数据监听
  watch: {

  }
}
</script>
<style lang="scss">
.yzhead {
  // 整个头部样式上
  height: 40px;
  padding-right: 50px;
  line-height: 40px;
  background-color: #FFF;
  box-shadow: 2px 3px 8px #f0eff4;
  border-bottom: 1px solid #f0eff4;
  // 左侧logo及名称样式
  &-name {
    display: inline-block;
    box-sizing: border-box;
    width: 240px;
    // width: 100px;
    // padding-left: 10px;
    text-align: center;
    white-space:nowrap;
    background-color:$yz-primarycol;
    color: #FFF;
    box-shadow: 2px 0px 8px #f0eff4;
    transition: all .3s;
    & img {
      height: 40px;
      vertical-align: bottom;
    }
    &[smal] {
      width: 60px;
      & span {
        display: none;
      }
    }
  }
  // 菜单及title Logo 的显示隐藏
  &-shrink {
    position: relative;
    top: 3px;
    margin-left: 5px;
    // vertical-align: sub;
    transition: all .8s;
    & .yz-icon-menushrink {
      font-size: 25px;
    }
    &[smal] {
      display: inline-block;
      vertical-align: initial;
      transform: rotate(90deg);
      top: 0;
    }
  }
  // 搜索区信息样式
  &-ipt {
    position: relative;
    display: inline-block;
    width: 600px;
    margin-left: 20px;
    // 搜索信息icon
    & i {
      position: absolute;
      top: 10px;
      font-size: 20px;
      color: $yz-secondaycol;
    }
    // 输入框
    & input {
      box-sizing: border-box;
      width: 100%;
      padding-left: 30px;
      border: 0;
      // border-bottom: 1px solid #d8d8d8;
      border-radius: 5px;
      font-size: 20px;
       transition: all .3s;
      &:hover,&:focus {
        border-bottom: 1px solid #d8d8d8;
      }
    }
  }
  // 消息提醒区域
  &-remind {
    float: right;
    margin-right: 40px;
    display: inline-block;
    & i {
      font-size: 20px;
    }
    & .reminditm {
      margin-right: 30px;
      &:last-child {
        margin-right: 0;
      }
    }
    & .el-badge__content.is-fixed {
      top: 10px;
    }
  }
  // 登录用户信息功能
  &-uinfo {
    float: right;
  }

}
</style>
