<template>
    <div class="com-skeleton flex" :style="{top: top + 'vw'}">
        <img class="anim" :src="require('@pic/common/logo.png')">
    </div>
</template>

<script>
export default {
    name: 'skeleton',
    props: {
        // 顶部偏移量，单位vw
        top: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
        }
    },
    created () {
    },
    methods: {
    },
    components: {
    }
}
</script>

<style lang="scss" scoped>
.com-skeleton{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4;
    background: #f4f4f4;
    img{
        margin: auto;
        width: 460px;
    }
}
</style>
