<template>
  <div id="app" class="d-flex">
    <!-- Sidebar com offcanvas e colapsável -->
    <Sidebar />

    <!-- Conteúdo principal -->
    <div class="flex-grow-1">
      <!-- <Navbar /> -->
      <main class="p-3">
        <router-view />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
//import Navbar from '@/components/NavbarComponent.vue';
import Footer from '@/components/FooterComponent.vue';
import Sidebar from '@/components/SidebarComponent.vue';
</script>

<style scoped>
/* Garante que a sidebar fique ao lado do conteúdo no desktop */
#app {
  min-height: 100vh;
}
</style>
