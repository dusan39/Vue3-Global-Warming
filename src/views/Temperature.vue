<template>
  <div>
    <h1>Temperature</h1>
  </div>
</template>

<script setup>

import { allAPI } from '../API';

  (async () => { const{ temperatureAPI } = await allAPI() })(); 

</script>

<style lang="scss" scoped>

</style>