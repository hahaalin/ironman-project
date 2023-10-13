import { createApp } from 'vue';
import { createVfm } from 'vue-final-modal';
import router from './router';
import ResizeTextarea from 'resize-textarea-vue3';
// import 'vue-final-modal/style.css';
import './style.css';
import App from './App.vue';
import { setupFirebase } from '@/services/firebase.js';
import { getFCMToken } from '@/services/getFCMMsg.js';
import './style.css';
import App from './App.vue';

setupFirebase;
getFCMToken();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}

const app = createApp(App);

app.use(router).use(createVfm()).use(ResizeTextarea).mount('#app');
