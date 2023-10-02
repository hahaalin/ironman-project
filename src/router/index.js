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
  },
  {
    path: '/vueFinalModal',
    name: 'VueFinalModal',
    component: () => import('../views/VueFinalModal.vue')
  },
  {
    path: '/windowResize',
    name: 'WindowResize',
    component: () => import('../views/WindowResize.vue')
  },
  {
    path: '/resizeObserver',
    name: 'ResizeObserver',
    component: () => import('../views/ResizeObserver.vue')
  },
  {
    path: '/vueEllipsis',
    name: 'VueEllipsis',
    component: () => import('../views/VueEllipsis.vue')
  },
  {
    path: '/resizeTextarea',
    name: 'ResizeTextarea',
    component: () => import('../views/ResizeTextarea.vue')
  },
  {
    path: '/textToSpeech',
    name: 'TextToSpeech',
    component: () => import('../views/TextToSpeech.vue')
  },
  {
    path: '/speechToText',
    name: 'SpeechToText',
    component: () => import('../views/SpeechRecognition.vue')
  },
  {
    path: '/compressorImg',
    name: 'CompressorImg',
    component: () => import('../views/CompressorImg.vue')
  },
  {
    path: '/toastify',
    name: 'Toastify',
    component: () => import('../views/Toastify.vue')
  },
  {
    path: '/intersectionObserverImg',
    name: 'IntersectionObserverImg',
    component: () => import('../views/IntersectionObserverImg.vue')
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
