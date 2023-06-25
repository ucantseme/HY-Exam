import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: "/", redirect: { name: 'forYou' } },
  { path: "/following", name: "following", component: () => import("@/views/following.vue") },
  { path: "/for-you", name: "forYou", component: () => import("@/views/forYou.vue") }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router