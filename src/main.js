import { createApp } from 'vue';
import { createVfm } from 'vue-final-modal';
import router from './router';
import ResizeTextarea from 'resize-textarea-vue3';
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
// import 'vue-final-modal/style.css';
import { setupFirebase } from '@/services/firebase.js';
import './style.css';
import App from './App.vue';

setupFirebase;
const app = createApp(App);

app
  .use(router)
  .use(createVfm())
  .use(ResizeTextarea)
  .use(Vue3Toasity, {
    dangerouslyHTMLString: true
  })
  .mount('#app');
