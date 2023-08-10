<template>
  
  <div>
    <div class="hero__container">
      <div class="title__container">
        <h1>{{ $t('title') }}</h1>

        <p>{{ $t('titleDescription1') }}</p>
        <p>{{ $t('titleDescription2') }}</p>
        <p>{{ $t('titleDescription3') }}</p>
      </div>   
      
      <div class="image__container">
        <img src="../assets/globe.svg" alt="">
        
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
      padding-left: 20px;
      padding-right: 20px;

      h1{
        margin-top: 3%;
      }

      p{
        margin-top: 3%;
      }
    }
  }

  .image__container{
    img{
      width: auto;
    }
  }

  .filler {
    flex: 1;
  }

  @media(min-width: 1201px){
    .hero__container{

      .title__container{
        padding-left: 0px;
      }
    }
  }

  @media screen and (max-width: 630px) {
    .hero__container{
      flex-direction: column;

      .image__container{
        display: flex;
        justify-content: center;
        padding-top: 20px;

        img{
          width: 50%;
        }
      }
    }
  }

</style>