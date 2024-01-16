<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Sign from './components/Sign.vue'
</script>

<template>
  <RouterView name="a" />
</template>

<style scoped>


nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}



@media (min-width: 1024px) {
  header {
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  
}
</style>
