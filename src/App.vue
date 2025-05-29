<template>
  <div class="d-flex container-fluid">
    <!-- Sidebar com offcanvas e colapsável -->
    <Sidebar />

    <!-- Conteúdo principal -->
    <div class="flex-grow-1">
      <!-- <Navbar /> -->
      <router-view />
    </div>
  </div>
  <Footer />
</template>

<script setup>
//import Navbar from '@/components/NavbarComponent.vue';
import Footer from '@/components/FooterComponent.vue';
import Sidebar from '@/components/SidebarComponent.vue';
</script>
