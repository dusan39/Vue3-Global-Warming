<template>
  <div>
    <routerLink to="/">Home</routerLink>
    <routerLink :to="{ name: 'Arctic' }">Arctic</routerLink>
    <routerLink :to="{ name: 'Co2' }">Co2</routerLink>
    <routerLink :to="{ name: 'Methane' }">Methane</routerLink>
    <routerLink :to="{ name: 'No2' }">No2</routerLink>
    <routerLink :to="{ name: 'Temperature' }">Temperature</routerLink>
  </div>
  <RouterView/>
</template>

<script setup>
  

</script>

<style lang="scss">

  div{
    a{
      padding: 10px;
    }
  }

</style>
