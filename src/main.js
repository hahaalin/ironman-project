import { createApp } from 'vue';
import { createVfm } from 'vue-final-modal';
import router from './router';
// import 'vue-final-modal/style.css';
import './style.css';
import App from './App.vue';
const app = createApp(App);

app.use(router).use(createVfm()).mount('#app');
