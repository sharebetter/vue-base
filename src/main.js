import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import {configInit, setENV, setBaseInfo} from './assets/envConfig.js'
// import {getwxAuth} from '../src/service/authService.js'
// import {wxConfig} from '../src/service/wxService.js'

// 自动加载组件
import './components'
import {strUtilInit} from './utils/strUtil.js'
// 移动端控制台，需要才开启
// import vConsole from './utils/vconsole';
import { Toast } from 'vant';

Vue.use(Toast);

Vue.config.productionTip = false
// 配置初始化
// configInit();
// 获取微信授权
// getwxAuth().then(() => {
   // wxConfig(location.href).then(() => {
      new Vue({
          router,
          store,
          render: h => h(App)
      }).$mount('#app')
   // })
// });
