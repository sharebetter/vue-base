export default [{
    path: '/About',
    name: 'about',
    component: () => import( /* webpackChunkName: "About" */ '@/views/About.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/Clear',
    name: 'Clear',
    component: () => import( /* webpackChunkName: "Clear" */ '@/views/common-page/clear-local.vue'),
    meta: {
      keepAlive: true,
      title: '缓存清除页'
    }
  },
  {
    path: '/',
    redirect: '/Home'
  }
]
