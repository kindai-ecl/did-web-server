import { createRouter, createWebHistory } from 'vue-router'
import DefaultView from '../views/default.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: DefaultView
    },
  ]
})

export default router