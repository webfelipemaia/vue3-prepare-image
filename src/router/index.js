// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Sobre from '@/views/AboutView.vue';
import ImageEditor from '@/components/ImageEditor.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/sobre', name: 'Sobre', component: Sobre },
  { path: '/editar-imagem', name: 'EditarImagem', component: ImageEditor },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
