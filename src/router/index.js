import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'

const routes = [
  {
    name: 'Home',
    path: '/',
    meta: {
        title: '首页'
    },
    component:Home,
    redirect:'/Welcome',
    children: [
        {
            name: 'Welcome',
            path: '/Welcome',
            meta: {
                title: '欢迎体验Vue3'
            },
            component: () => import('../views/Welcome.vue')
        },
        {
            name: 'PdfTopic',
            path: '/PdfTopic',
            meta: {
                title: 'PDF 录题'
            },
            component: () => import('../views/PdfTopic.vue')
        },
        {
            name: 'HandTopic',
            path: '/HandTopic',
            meta: {
                title: '手动录题'
            },
            component: () => import('../views/HandTopic.vue')
        }
    ] 
},
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 导航守卫
// router.beforeEach((to, from, next) => {
//   // 做路由管理：
// })

export default router