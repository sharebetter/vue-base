<template>
  <div class="top-tab">
    <van-tabs :active="tabSelect" :swipe-threshold="4" @click="tabChange" background="none" title-active-color="#2F6FFF" title-inactive-color="#333333" color="#2F6FFF" :line-width="30">
      <van-tab v-for="(item) in tabList" :key="item.cateChildId">
        <div slot="title">
          {{item.cateChildName}}
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
export default {
  props: {
    tabSelect: {
      default () {
        return 0
      }
    },
    tabList: {
      type: Array
    }
  },
  components: {
    vanTabs: Tabs,
    vanTab: Tab,
  },
  data () {
    return {

    }
  },
  computed: {
    routePath () {
      return this.$route.path
    }
  },
  activated () {
    // tab吸顶
    window.addEventListener('scroll', this.tabScroll)
  },
  methods: {
    tabChange (index) {
      this.$emit('tabChange', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.top-tab {
  position: absolute;
  width: 100%;
  height: 95px;
  z-index: 5;
  background: #fff;
  .tab-fire-icon {
    width: 25px;
    height: 35px;
  }
}
</style>
