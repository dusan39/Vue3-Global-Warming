<template>

  <div class="footer__container">

    <div class="social__links">
      <a href="https://github.com/dusan39" target="_blank" rel="noopener"><img src="../assets/footer/github.svg" alt=""></a>
      <a href="https://www.linkedin.com/in/dusan-rajkovic-23b3831b7/" target="_blank" rel="noopener"><img src="../assets/footer/linkedin.svg" alt=""></a>
      <a href="mailto:dusanrajkovic26@gmail.com"><img src="../assets/footer/gmail.svg" alt=""></a>
    </div>
    
  </div>

</template>

<script setup>

</script>

<style lang="scss">

  .footer__container{
    border-top: 2px solid rgba(255, 255, 255, .5);
    padding: 20px;
    margin-top: 5%;
    width: 100%;

    .social__links{
      display: flex;
      justify-content: center;

      img{
        width: 50px;
        margin: 10px;
      }
    }
    
  }
</style>