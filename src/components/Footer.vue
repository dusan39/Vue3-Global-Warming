<template>

  <div class="footer__container border-t-2 border-t-slate-950 dark:border-t-slate-50" >
    <div class="social__links">
      <a href="https://github.com/dusan39" target="_blank" rel="noopener"><img src="../assets/footer/github.svg" alt=""></a>
      <a href="https://www.linkedin.com/in/dusan-rajkovic-23b3831b7/" target="_blank" rel="noopener"><img src="../assets/footer/linkedin.svg" alt=""></a>
      <a href="mailto:dusanrajkovic26@gmail.com"><img src="../assets/footer/gmail.svg" alt=""></a>
    </div>

    <div class="year__name__container">
      <h2>&copy; {{ date }} Dusan Rajkovic</h2>
    </div>
  </div>

</template>

<script setup>

  let date = new Date().getFullYear()

</script>

<style lang="scss" scoped>

  .footer__container{
    padding: 20px;
    width: 100%;

    .social__links{
      display: flex;
      justify-content: center;

      img{
        width: 40px;
        margin: 10px;
      }
    }

    .year__name__container{
      display: flex;
      align-items: center;
      justify-content: center;

      h2{
        color: lightslategray;
      }
    }
    
  }
</style>