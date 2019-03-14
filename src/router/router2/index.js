export default [
    {
        path: '/About',
        name: 'about',
        component: () => import(/* webpackChunkName: "About" */ '@/views/About.vue'),
        meta: { keepAlive: true }
    }
]
