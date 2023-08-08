<!--<template>

  <Navbar></Navbar> 
  
  <RouterView v-slot="{ Component }">
    <Transition name="page-slide" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>

  <Footer></Footer>
  
</template>
-->
<template>
  <div id="app">
    <Navbar></Navbar>
    <div id="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="page-slide" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
    <Footer></Footer>
  </div>
</template>


<script setup>

import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

</script>

<style lang="scss">

  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow: hidden;
  }

  #main-content {
    flex: 1; 
    overflow-y: auto;
  }

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
