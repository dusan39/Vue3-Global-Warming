<template>
  
  <div>
    <div class="hero__container">
      <div class="title__container">
        <h1>{{ $t('title') }}</h1>

        <p>{{ $t('titleDescription') }}</p>
      </div>   
      
      <div class="image__container">
        <h2>prova prova prova 123</h2>
      </div>
    </div>
    <div class="filler"></div>
  </div>
  
</template>

<script setup>

</script>

<style lang="scss">

  .navbar__container{
    max-width: 100%;
  }

  .hero__container{
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;

    .title__container{

      h1{
        margin-top: 3%;
      }

      p{
        margin-top: 3%;
      }
    }
  }

  .filler {
    flex: 1;
  }

</style>