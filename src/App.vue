<template>
  <div id="app">
    <!-- loading 动画 -->
    <div class="loader-overlay" v-show="isImageLoading || isLoading || isWxLoading">
      <div class="my-loader">
        <div class="ku-loader"></div>
      </div>
    </div>
    <keep-alive>
      <router-view class="router" v-transition v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="router" v-transition v-if="!$route.meta.keepAlive"></router-view>
    <!-- 蒙层遮罩 -->
    <div class="overlay" v-show="isOverlayShow" @touchmove.prevent></div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  mounted () {
    document.addEventListener('click', e => {
      if (e.target.nodeName.toLowerCase() === 'img') {
        if (this.$route.path === '/ArticleDetail') {
          if (e.target.dataset.type !== 'unclick') {
            wx.previewImage({
              current: e.target.src,
              urls: [e.target.src]
            });
          } else {
            e.preventDefault();
          }
        } else {
          e.preventDefault();
        }
      }
    }, false)
  },
  methods: {
  },
  computed: {
    ...mapState(['isImageLoading', 'isLoading', 'isOverlayShow', 'isWxLoading'])
  },
  components: {
  }
}
</script>

<style lang="scss">
@import url("./assets/css/common.scss");
@import url("./assets/css/normalize.scss");
@import url("./assets/css/animate.scss");
@import url("./assets/css/iconfonts/iconfont.css");
#app {
  color: #333;
  height: 100vh;
}
.loader-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 100;
  .my-loader {
    position: fixed;
    background: rgba($color: #000000, $alpha: 0.7);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    padding: 30px;
    border-radius: 8px;
  }
}
// 分享引导
.pic-share {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 750px;
  z-index: 101;
}
// 遮罩
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
// 返回首页
.to-home {
  position: fixed;
  right: 30px;
  bottom: 60px;
  width: 131px;
  height: 131px;
  img {
    width: 100%;
    height: 100%;
  }
}
.router {
  min-height: 100vh;
  background: white;
}
.my-loader {
  position: fixed;
  background: rgba($color: #000000, $alpha: 0.7);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  padding: 30px;
  border-radius: 8px;
}
// 以下是loading用的
$colors: hsla(337, 84, 48, 0.75) hsla(160, 50, 48, 0.75) hsla(190, 61, 65, 0.75)
  hsla(41, 82, 52, 0.75);
$size: 2.5em;
$thickness: 0.5em;

// Calculated variables.
$lat: ($size - $thickness) / 2;
$offset: $lat - $thickness;

.ku-loader {
  position: relative;
  width: $size;
  height: $size;
  transform: rotate(165deg);

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: $thickness;
    height: $thickness;
    border-radius: $thickness / 2;
    transform: translate(-50%, -50%);
  }

  &:before {
    animation: before 2s infinite;
  }

  &:after {
    animation: after 2s infinite;
  }
}

@keyframes before {
  0% {
    width: $thickness;
    box-shadow: $lat (-$offset) nth($colors, 1), (-$lat) $offset nth($colors, 3);
  }
  35% {
    width: $size;
    box-shadow: 0 (-$offset) nth($colors, 1), 0 $offset nth($colors, 3);
  }
  70% {
    width: $thickness;
    box-shadow: (-$lat) (-$offset) nth($colors, 1), $lat $offset nth($colors, 3);
  }
  100% {
    box-shadow: $lat (-$offset) nth($colors, 1), (-$lat) $offset nth($colors, 3);
  }
}

@keyframes after {
  0% {
    height: $thickness;
    box-shadow: $offset $lat nth($colors, 2), (-$offset) (-$lat) nth($colors, 4);
  }
  35% {
    height: $size;
    box-shadow: $offset 0 nth($colors, 2), (-$offset) 0 nth($colors, 4);
  }
  70% {
    height: $thickness;
    box-shadow: $offset (-$lat) nth($colors, 2), (-$offset) $lat nth($colors, 4);
  }
  100% {
    box-shadow: $offset $lat nth($colors, 2), (-$offset) (-$lat) nth($colors, 4);
  }
}
</style>
