// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Sobre from '@/views/AboutView.vue';
import ImageEditor from '@/components/ImageEditor.vue';
import PdfHandler from '@/components/PdfHandler.vue';
import ImageHandler from '@/components/ImageHandler.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/sobre', name: 'Sobre', component: Sobre },
  { path: '/extrair-pdf', name: 'ExtrairPdf', component: PdfHandler },
  { path: '/extrair-imagem', name: 'ExtrairImagem', component: ImageHandler },
  { path: '/editar-imagem', name: 'EditarImagem', component: ImageEditor },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
