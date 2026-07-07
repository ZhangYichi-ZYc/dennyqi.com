import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/notes/:path(.*)*',
      name: 'notes',
      component: () => import('@/views/NotesView.vue'),
    },
  ],
})

export default router
