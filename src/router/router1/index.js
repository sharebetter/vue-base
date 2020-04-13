export default [{
  path: '/Home',
  name: 'home',
  component: () => import( /* webpackChunkName: "home-page" */ '@/views/home-page/index.vue'),
  meta: {
    keepAlive: true,
    title: '保叔合伙人'
  }
}]
