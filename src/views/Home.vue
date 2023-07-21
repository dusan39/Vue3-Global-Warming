<template>

  <div class="navbar__container">
    <Navbar></Navbar> 
  </div>

  <div v-motion-slide-left class="hero__container">
    <div class="title__container">
      <h1>Unveiling <br> the Truth <br> about Global Warming</h1>
      <p>
        In this web app we'll show you the real impact of the global waming during the last decades,<br> with specific charts with different
        data from the Arctic level to the growing of the Temperature.
      </p>

      <button class="show__charts">Show charts</button>
    </div>
    
    <div class="image__container">
      <h2>prova prova prova</h2>
    </div>
  </div>

</template>

<script setup>
import Navbar from '../components/Navbar.vue';

</script>

<style lang="scss">

  .navbar__container{
    max-width: 100%;
  }

  .hero__container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;

    .title__container{
      display: flex;
      flex-direction: column;
      justify-content: space-between;


      h1{
        margin-top: 3%;
      }

      p{
        margin-top: 3%;
      }

      .show__charts{
        padding: 10px 30px;
        border: 1px solid red;
        border-radius: 20px;
      }
    }
  }

</style>