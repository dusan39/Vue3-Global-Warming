<template>
  <div class="skeleton__container">
    <h3>Loading...</h3>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">

  .skeleton__container{
    padding-top: 50px;

    h3{
      color: black;
      padding: 10px 20px;
      border-radius: 10px;
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