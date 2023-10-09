import { createApp } from 'vue';
import { createVfm } from 'vue-final-modal';
import router from './router';
import ResizeTextarea from 'resize-textarea-vue3';
// import 'vue-final-modal/style.css';
import { setupFirebase } from '@/services/firebase.js';
import './style.css';
import App from './App.vue';

setupFirebase();
const app = createApp(App);

app.use(router).use(createVfm()).use(ResizeTextarea).mount('#app');
