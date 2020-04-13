import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false, // loading框
    isWxLoading: false, // 微信配置loading框
    isImageLoading: false, // 生成图片loading框
    isGuideShow: false, // 分享弹窗
    isOverlayShow: false, // 遮罩
    isSkeletonShow: false, // loading屏
    isRouterAlive: true // 路由keep-alive
  },
  mutations: {
    setLoadingStatus(state, status) {
      state.isLoading = status;
    },
    setWxLoadingStatus(state, status) {
      state.isWxLoading = status;
    },
    setImageLoadingStatus(state, status) {
      state.isImageLoading = status;
    },
    setOverlayShow(state, status) {
      state.isOverlayShow = status
    },
    setSkeletonShow(state, status) {
      state.isSkeletonShow = status
    },
    setGuideShow(state, status) {
      state.isGuideShow = status
    },
    setRouterAlive(state, status) {
      state.isRouterAlive = status
    }
  }
})
