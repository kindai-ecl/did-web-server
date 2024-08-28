import { createRouter, createWebHistory } from 'vue-router'

import DefaultView from '@/views/Default.vue'
import Initdid from '@/views/Initdid.vue'


const routes = [
  {
    path: '/',
    name: 'default',
    component: DefaultView
  },
  {
    path: '/did/',
    name: 'did',
    component: Initdid
  },
  {
    path: '/vc/',
    name: 'vc',
    component: Initdid
  }

]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router