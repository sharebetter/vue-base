import Vue from 'vue'
import Router from 'vue-router'
import vueg from 'vueg'
import {
  checkVersion
} from '@utils/checkVersion.js';
import {
  wxConfig
} from '../service/wxService.js'
import 'vueg/css/transition-min.css'
/* eslint-disable */
Vue.use(Router)

// 自动导入路由
let routes = []
const routeContext = require.context('./', true, /index\.js$/)
routeContext.keys().forEach(route => {
  // 如果是根目录的 index.js 不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routeContext(route)
  routes = [...routes, ...(routerModule.default || routerModule)]
});

const router = new Router({
  // mode: 'history',
  // base: process.env.NODE_ENV === 'production' ? '/jiajia/' : '',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = `${to.meta.title}`
  next()
})
// 微信签证
router.afterEach(to => {
  try {
    //关闭了自动PV跟踪
    window._hmt.push(['_setAutoPageview', false]);
    // 百度统计
    if (to.path) {
      // window._hmt.push(['_trackPageview', '/epidemic/#' + to.fullPath]);
      window._hmt.push(['_trackPageview', '/#' + to.fullPath]);
    }
  } catch (e) {
    console.log('百度统计', e)
  }

  //     // 微信验签，ios只需验证一次即可
  //     let url = `${global.base}jiajia${to.fullPath}`
  //     if (checkVersion().ios) {
  //         if (!global.isConfig) {
  //             wxConfig(location.href)
  //         }
  //     } else {
  //         wxConfig(url)
  //     }
  //     global.isConfig = true
})
const options = {
  duration: '.3', // 转场动画时长，默认为0.3，单位秒
  firstEntryDisable: false, // 值为true时禁用首次进入应用时的渐现动画，默认为false
  firstEntryDuration: '.6', // 首次进入应用时的渐现动画时长，默认为.6
  forwardAnim: 'slideInRight', // 前进动画，默认为fadeInRight
  backAnim: 'slideInLeft', // 后退动画，默认为fedeInLeft
  sameDepthDisable: false, // url深度相同时禁用动画，默认为false
  tabsDisable: true, // 值为true时，tabs间的转场没有动画，默认为false
  shadow: false, // 值为false，转场时没有阴影的层次效果
  disable: false // 禁用转场动画，默认为false，嵌套路由默认为true
}
Vue.use(vueg, router, options)

export default router
