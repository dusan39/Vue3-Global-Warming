<template>
  <div>
    <h1>Methane</h1>
  </div>
</template>

<script setup>

import { allAPI } from '../API';

  (async () => { const{ methaneAPI } = await allAPI() })(); 

</script>

<style lang="scss" scoped>

</style>