import { createRouter, createWebHistory } from 'vue-router'
import { getDid } from '../utils/indexedDB'

const routes = [
  {
    path: '/wallet/',
    name: 'default',
    component: () => import('@/views/Default.vue'),
  },
  {
    path: '/did/',
    name: 'did',
    component: () => import('@/views/Initdid.vue'),
  },
  {
    path: '/vc-request/',
    name: 'vcRequest',
    component: () => import('@/views/VCRequest.vue'),
  },
  {
    path: '/qr-reader/',
    name: 'qrReader',
    component: () => import('@/views/QRcode.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router