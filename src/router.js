import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Theory from './pages/Theory.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/theory', component: Theory }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router