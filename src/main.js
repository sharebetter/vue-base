import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 自动加载全局组件
import './components'

import { Toast } from 'vant';

Vue.use(Toast);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
