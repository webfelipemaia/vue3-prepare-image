// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Sobre from '@/views/AboutView.vue';
import ImageEditor from '@/components/ImageEditor.vue';
//import PdfHandler from '@/components/PdfHandler.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/sobre', name: 'Sobre', component: Sobre },
  /* { path: '/pdf-para-imagem', name: 'PdfParaImagem', component: PdfHandler }, */
  { path: '/editar-imagem', name: 'EditarImagem', component: ImageEditor },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
