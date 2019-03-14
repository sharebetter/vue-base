<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import {getConfig} from '@api/CommonApi.js'
export default {
    name: 'home',
    created () {
        getConfig()
    }
}
</script>
<style lang="scss" scoped>
.home{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: white;
}

</style>

