<template>
  <div class="about">
    <h1>This is an about page</h1>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <skeleton :top="15" v-show="isSkeletonShow"></skeleton>
  </div>
</template>
<script>
import { Button } from 'vant';
export default {
    components: {
        'van-button': Button
    },
    data () {
        return {
            isSkeletonShow: true
        }
    },
    created () {
        setTimeout(() => {
            this.isSkeletonShow = false
        }, 2000);
    }
}
</script>

<style lang="scss" scoped>
.about{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: white;
}
</style>
