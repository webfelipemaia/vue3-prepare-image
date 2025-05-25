<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Instituição</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Alternar navegação"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Início</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/editar-imagem">Editar Imagem</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/sobre">Sobre</router-link>
          </li>
        </ul>
      </div>
      
        <div class="col-md-3 text-end"> <button type="button" class="btn btn-outline-primary me-2">Login</button> <button type="button" class="btn btn-primary">Sign-up</button> </div> 
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>
