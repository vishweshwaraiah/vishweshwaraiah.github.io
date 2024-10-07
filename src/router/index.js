import { createRouter, createWebHistory } from 'vue-router'
import MyPortfolio from '@src/views/MyPortfolio.vue'
import MyResume from '@src/views/MyResume.vue'
import MyProjects from '@src/views/MyProjects.vue'
import CoverLetter from '@src/views/CoverLetter.vue'
import PageNotFound from '@src/views/PageNotFound.vue'
import AboutDev from '@src/views/AboutDev.vue'
import ContactMe from '@src/views/ContactMe.vue'
import MiscTools from '@src/views/MiscTools.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Portfolio',
      component: MyPortfolio,
      meta: {
        hidden: false,
        print: false
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: MyResume,
      meta: {
        hidden: false,
        print: true
      }
    },
    {
      path: '/projects',
      name: 'Projects',
      component: MyProjects,
      meta: {
        hidden: false,
        print: true
      }
    },
    {
      path: '/coverletter',
      name: 'Cover letter',
      component: CoverLetter,
      meta: {
        hidden: false,
        print: true
      }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactMe,
      meta: {
        hidden: false,
        print: false
      }
    },
    {
      path: '/about',
      name: 'About',
      component: AboutDev,
      meta: {
        hidden: false,
        print: false
      }
    },
    {
      path: '/tools',
      name: 'Tools',
      component: MiscTools,
      meta: {
        hidden: true,
        print: true
      }
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: PageNotFound,
      meta: {
        hidden: true,
        print: false
      }
    }
  ]
})

export default router
