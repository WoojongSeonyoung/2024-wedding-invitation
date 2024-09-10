import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    // {
    //     name: 'About',
    //     path: '/about',
    //     component: () => import('@/views/About.vue')
    // },
    // {
    //     name: 'Blank',
    //     path: '/blank',
    //     component: () => import('@/views/Blank.vue')
    // }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
    routes
})

export default router
