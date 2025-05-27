<!-- src/components/Sidebar.vue -->
<template>
  <div>
    <!-- Botão Offcanvas (mobile) -->
    <button
      class="btn btn-primary d-md-none m-2"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#sidebarOffcanvas"
      aria-controls="sidebarOffcanvas"
    >
      ☰ Menu
    </button>

    <!-- Offcanvas para telas pequenas -->
    <div
      class="offcanvas offcanvas-start d-md-none"
      tabindex="-1"
      id="sidebarOffcanvas"
      aria-labelledby="sidebarOffcanvasLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="sidebarOffcanvasLabel">Menu</h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Fechar"
        ></button>
      </div>
      <div class="offcanvas-body">
        <SidebarContent :collapsed="false" />
      </div>
    </div>

    <!-- Sidebar fixa para telas grandes -->
    <div
      class="d-none d-md-flex flex-column bg-light border-end vh-100 p-3 transition-width"
      :style="{ width: collapsed ? '60px' : '250px' }"
    >
      <!-- Botão de colapsar -->
      <button class="btn btn-sm btn-outline-secondary mb-3" @click="toggleSidebar">
        {{ collapsed ? '⮞' : '⮜' }}
      </button>

      <SidebarContent :collapsed="collapsed" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SidebarContent from './SidebarContent.vue';

const collapsed = ref(false);
const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};
</script>

<style scoped>
.transition-width {
  transition: width 0.3s ease;
}
</style>