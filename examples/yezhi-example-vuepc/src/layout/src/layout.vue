<template>
  <div class="yzbs">
    <yzhead/>
    <yzmenu/>
    <!-- <yzcontent/> -->
  </div>
</template>
<script>
import yzhead from './components/head.vue'
import yzmenu from './components/menu.vue'
// import yzcontent from './components/content.vue'
export default {
  components: {
    yzhead,
    yzmenu
    // yzcontent
  }
}
</script>
<style lang="scss">
.yzbs {
  width: 100%;
  height: 100%;
}
</style>
