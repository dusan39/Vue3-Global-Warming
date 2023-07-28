<template>

  <Navbar></Navbar> 

  <RouterView/>
    
</template>

<script setup>
import Navbar from './components/Navbar.vue';

</script>

<style lang="scss">

  html.dark{
    color-scheme: dark;
  }

  body{
    @apply bg-slate-50 text-slate-800 dark:bg-slate-800 dark:text-slate-50;
  }

</style>
