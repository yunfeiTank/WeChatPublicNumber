export default [
    {
        path: '/home',
        name: 'HomePiece',
        component: () => import(/* webpackChunkName: "homePiece" */ '@/views/HomePiece.vue')
    },
    {
        path: '/invoice',
        name: 'invoice',
        component: () => import(/* webpackChunkName: "invoice" */ '@/views/Invoice.vue')
    },
    {
        path: '/indetail',
        name: 'indetail',
        component: () => import(/* webpackChunkName: "InDetail" */ '@/views/InDetail.vue')
    },
    {
        path: '/imgspot',
        name: 'imgspot',
        component: () => import(/* webpackChunkName: "imgspot" */ '@/views/ImgSpot.vue')
    },
    {
        path: '/my',
        name: 'my',
        component: () => import(/* webpackChunkName: "my" */ '@/views/My.vue')
    }
]