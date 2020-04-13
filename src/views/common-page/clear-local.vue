<template>
  <div>
    缓存清除页
  </div>
</template>

<script>
export default {
  activated () {
    this.$local.clear()
    this.$toast('缓存清除成功')
  },
}
</script>

<style lang="scss" scoped>
</style>