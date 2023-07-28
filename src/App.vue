<template>

  <Navbar></Navbar> 

  <RouterView v-slot="{ Component }">
    <Transition name="page-slide" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
  
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

  .page-slide-enter-active,
  .page-slide-leave-active{
    transition: 600ms ease all;
  }

  .page-slide-enter-from,
  .page-slide-leave-to{
    opacity: 0;
    transform: translateY(60px);
  }

</style>
