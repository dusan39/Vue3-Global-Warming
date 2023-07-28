<template>

  <div v-motion-slide-left class="hero__container">
    <div class="title__container">
      <h1>{{ $t('title') }}</h1>
      <p>{{ $t('titleDescription') }}</p>

      <div class="show__charts__container">
        <button class="show__charts">{{ $t('showCharts') }}</button>
      </div>   
    </div>
    
    <div class="image__container">
      <h2>prova prova prova</h2>
    </div>
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

      .show__charts__container{
        margin-top: 3%;

        .show__charts{
          padding: 10px 30px;
          border: 1px solid red;
          border-radius: 20px;
        }
      }
    }
  }

</style>