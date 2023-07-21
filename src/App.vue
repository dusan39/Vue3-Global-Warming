<template>

  <RouterView/>
  
</template>

<script setup>


</script>

<style lang="scss">

  html.dark{
    color-scheme: dark;
  }

  body{
    @apply bg-slate-50 text-slate-800 dark:bg-slate-800 dark:text-slate-50;
  }

</style>
