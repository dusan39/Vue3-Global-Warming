<template>
  <div>
    <h1>No2</h1>
  </div>
</template>

<script setup>

import { allAPI } from '../API';

  (async () => { const{ no2API } = await allAPI() })();
   
</script>

<style lang="scss" scoped>

</style>