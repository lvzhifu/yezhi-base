<!--<template>
  <div>
    欢迎使用
  </div>
</template>-->
<script>
export default {
  name: 'yzhome',
  props: {
    padding: {
      type: Boolean,
      default: true
    }
  },
  render () {
    return (
      <div class="bs-page">
        {
          '欢迎使用'
        }
      </div>
    )
  }
}
</script>
<style lang="scss">
.bs-page {
  color: red;
}
</style>
