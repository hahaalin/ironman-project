import { createRouter, createWebHashHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
  },
  {
    path: '/asyncComponent',
    name: 'AsyncComponent',
    component: () => import('../views/AsyncComponent.vue')
  },
  {
    path: '/intersectionObserverComponent',
    name: 'IntersectionObserverComponent',
    component: () => import('../views/IntersectionObserverComponent.vue')
  },
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: () => import('../views/Onboarding.vue')
  },
  {
    path: '/vmemo',
    name: 'Vmemo',
    component: () => import('../views/Vmemo.vue')
  },
  {
    path: '/useMemoize',
    name: 'UseMemoize',
    component: () => import('../views/UseMemoize.vue')
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/successSign',
    name: 'SuccessSign',
    component: () => import('../views/SuccessSign.vue'),
    meta: { requiresAuth: true }
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      user => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth && !(await getCurrentUser())) {
    return {
      path: '/signIn',
      query: { redirect: to.fullPath }
    };
  }
});

export default router;
