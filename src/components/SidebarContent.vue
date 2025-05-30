<!-- src/components/SidebarContent.vue -->
<template>
  <ul class="nav flex-column">
    <li class="nav-item" v-for="item in menu" :key="item.path">
      <router-link class="nav-link d-flex align-items-center" :to="item.path">
        <span>{{ collapsed ? item.icon : item.label }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  collapsed: Boolean,
});

const menu = [
  { path: '/', label: 'Início', icon: '' },
  { path: '/extrair-pdf', label: 'Extrair PDF', icon: '' },
  { path: '/extrair-imagem', label: 'Extrair Imagem', icon: '' },
  { path: '/editar-imagem', label: 'Editar Imagem', icon: '' },
  { path: '/sobre', label: 'Sobre', icon: '' },
];
</script>