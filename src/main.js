import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/css/style.css';
import 'tui-image-editor/dist/tui-image-editor.css';
import 'bootstrap/dist/css/bootstrap.min.css';


createApp(App)
.use(router)
.mount('#app');
