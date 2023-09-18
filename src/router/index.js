import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    name: 'Draggable',
    component: () => import('../views/Draggable.vue')
  },
  {
    path: '/simple',
    name: 'Simple',
    component: () => import('../views/Simple.vue')
  },
  ,
  {
    path: '/lightbox',
    name: 'Ligntbox',
    component: () => import('../views/Lightbox.vue')
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
