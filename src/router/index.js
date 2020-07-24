import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes:[
        // {
        //     path:'/',
        //     name:'home',
        //     component:() => import('../views/home/home.vue')
        // },
        {
            path:'/login',
            name:'login',
            component: () => import('../views/personality/login.vue'),
        },
        {
            path:'/loginByTel',
            name:'loginByTel',
            component: () => import('../views/personality/loginByTel.vue'),
        },
        {
            path: '/',
            name: 'layOut',
            component: () => import('../views/home/layOut.vue'),
            // redirect: store.getters['menuPath'],
            children: [
                {
                    path: '/home',
                    name:'home',
                    component:() => import('../views/tab/home.vue')
                },
                // 元数据部分路由引入
                // ...BusinessMetadata,
                // {
                //     path: '/taskTopologicalGraph',
                //     name: '/taskTopologicalGraph',
                //     component: () => import('@/views/dataGovernance/businessMetadata/blood/Blood')
                // },
            ]
        }
    ]
})
export default router
