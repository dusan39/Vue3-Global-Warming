<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="main-content">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </div>
    <Footer></Footer>
  </div>
</template>


<script setup>

import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import router from './router/index'
import { useI18n } from "vue-i18n";
const i18n = useI18n();

router.beforeEach((to, from, next) => {
  if (to.meta.title)
    document.title = i18n.t(to.meta.title);
  next();
})

</script>

<style lang="scss">

  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow: hidden;
  }

  .main-content {
    flex: 1; 
    overflow-y: auto;
  }

  html.dark{
    color-scheme: dark;
  }

  body{
    @apply bg-slate-50 text-slate-800 dark:bg-slate-800 dark:text-slate-50;
  }

</style>
