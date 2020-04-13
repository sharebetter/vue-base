import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  configInit,
  setENV
} from '../src/assets/envConfig.js'
import {
  getwxAuth
} from '../src/service/authService.js'
import {
  getConfig
} from '../src/api/CommonApi.js'
import local from '@utils/localUtil.js'
// 自动加载组件
import './components'
import {
  strUtilInit
} from './utils/strUtil.js'
// 移动端控制台，需要才开启
// import vConsole from './utils/vconsole'
import {
  Toast,
  Popup
} from 'vant';

Vue.use(Toast).use(Popup);

Vue.config.productionTip = false
// 全局添加local
Vue.prototype.$local = local
// 配置初始化
configInit();
// 获取微信授权
// 获取资源目录
getConfig().then((res) => {
  if (res) {
    // 记录当前服务器时间
    local.setItem('service_time_stamp', res.serviceTimeStamp)
    // 获取本地时间与服务器时间差
    global.disTime = res.serviceTimeStamp - new Date().getTime()
    setENV(res)
  }
  getwxAuth().then(() => {
    global.vm = new Vue({
      el: '#app',
      router,
      store,
      components: {
        App
      },
      template: '<App/>'
    })
  })
});
// 字符串工具初始化
strUtilInit();
