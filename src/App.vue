<!-- src/App.vue -->
<script setup>
import Navbar from './components/Navbar.vue'; // Importa el componente Navbar
import Footer from './components/Footer.vue';
</script>

<template>
  <div>
    <Navbar /> <!-- Usa el componente Navbar -->
    <router-view /> <!-- Renderiza el componente según la ruta actual -->
    <Footer />
  </div>
</template>

<style>
/* Puedes agregar estilos globales aquí si lo necesitas */
</style>
