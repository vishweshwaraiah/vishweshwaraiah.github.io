import { createRouter, createWebHistory } from 'vue-router'
import MyResume from '@/views/MyResume.vue'
import CoverLetter from '@/views/CoverLetter.vue'
import PageNotFound from '@/views/PageNotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MyResume
    },
    {
      path: '/coverletter',
      name: 'coverletter',
      component: CoverLetter
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (AboutDev.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutDev.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: PageNotFound
    }
  ]
})

export default router
