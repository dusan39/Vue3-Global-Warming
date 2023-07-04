<template>
  <div class="skeleton__container">
    <Navbar></Navbar>
    <h3>Loading...</h3>
  </div>
</template>

<script setup>

import Navbar from './Navbar.vue';

</script>

<style scoped lang="scss">

  .skeleton__container{

    h3{
      color: black;
      padding: 10px 20px;
      border-radius: 10px;
      margin-top: 50px;
      animation: pulse-bg 1s infinite;
    }
  }

  @keyframes pulse-bg{
    0%{
      background-color: rgb(255, 255, 255);
    }
    50%{
      background-color: #989494;
    }
    100%{
      background-color: #eee;
    }
  }

</style>