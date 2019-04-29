import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import {getwxAuth} from '../src/service/authService.js'

// 自动加载组件
import './components'
import {strUtilInit} from './utils/strUtil.js'
// 移动端控制台，需要才开启
// import vConsole from './utils/vconsole';
import { Toast } from 'vant';

Vue.use(Toast);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
