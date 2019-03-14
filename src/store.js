import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoading: false, // loading框
        isGuideShow: false // 分享弹窗
    },
    mutations: {
        setLoadingStatus (state, status) {
            state.isLoading = status;
        },
        setGuideShow (state, status) {
            state.isGuideShow = status
        }
    }
})
