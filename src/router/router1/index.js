export default [
    {
        path: '/Home',
        name: 'home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
        meta: { keepAlive: true }
    }
]
