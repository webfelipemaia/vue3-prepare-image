<template>
  <footer class="bg-dark text-white py-4">
    <div class="container">
      <div class="row">
        <!-- Coluna 1: Logo -->
        <div class="col-md-4 mb-3">
          <h5>Instituição</h5>
          <img src="@/assets/arquivo-nacional-logo.png" alt="Logo" class="img-fluid" />
          
          <h5>Contato</h5>
          <p>Rua Exemplo, 123</p>
          <p>São Gonçalo, RJ</p>
          <p>Email: contato@instituicao.com</p>
          <p>Telefone: (21) 1234-5678</p>
        </div>

        <!-- Coluna 2: Menu -->
        <div class="col-md-4 mb-3">
          <h5>Menu</h5>
          <ul class="list-unstyled">
            <li><router-link class="text-white text-decoration-none" to="/">Início</router-link></li>
            <li><router-link class="text-white text-decoration-none" to="/sobre">Sobre</router-link></li>
          </ul>
        </div>

        <!-- Coluna 3: Contato -->
        <div class="col-md-4 mb-3">
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>
