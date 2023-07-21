<template>

  <header class="header">
    <div class="header__content">
      <a class="header__logo">
        <routerLink to="/"><img width="48" height="48" src="https://img.icons8.com/fluency/48/global-warming.png" alt="global-warming"/></routerLink>
      </a>
      <ul class="header__menu">
        <routerLink to="/">Home</routerLink>
        <routerLink :to="{ name: 'Arctic' }">Arctic</routerLink>
        <routerLink :to="{ name: 'Co2' }">Co2</routerLink>
        <routerLink :to="{ name: 'Methane' }">Methane</routerLink>
        <routerLink :to="{ name: 'No2' }">No2</routerLink>
        <routerLink :to="{ name: 'Temperature' }">Temperature</routerLink>
        <DarkMode></DarkMode>
      </ul>
      <div class="header__icons">
        <div class="icon-hamburger">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </header>

</template>

<script setup>
import DarkMode from './DarkMode.vue';

 document.addEventListener('DOMContentLoaded', () => {
  let item = document.querySelector('.icon-hamburger');
  let menu = document.querySelector('.header__menu');

  item.addEventListener('click', function () {
    document.body.classList.toggle('menu-open');
  });

  menu.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      document.body.classList.toggle('menu-open');
    }
  });
});

</script>

<style lang="scss">
 
.header{
  top: 0;
  z-index: 9999;
  width: 100%;
}

.header__content{max-width: 1200px; width: 100%; margin: 0 auto; display: flex; justify-content: space-between;}
.header__logo{padding: 10px 10px 10px 20px; margin: 0px; order: 1;}
.header__logo a{margin: 0px; font-size: 24px;}
.header__menu{padding: 0px; margin: 0px; order: 3; align-self: center;}
.header__menu a{display: inline-block; opacity: 0.8; font-size: 18px; padding: 10px 20px; text-decoration: none; color: white;}
.header__icons{width: 50px; order: 2;}

@media(min-width: 1201px){
  .header__logo{padding: 10px 10px 10px 0px;}
  .header__menu li:nth-child(4){padding-right: 0px !important;}
}

@media (max-width: 860px){
  .header__menu{
    position: absolute;
    top: 60px;
    background-color: #1d1d1f;
    width: 100%;
    height: 80vh;
    height: 0vh;
    overflow: hidden;
    transition: all 1s cubic-bezier(.215, .61, .355, 1);
  }
  .header__logo{padding: 10px 20px; margin: 0px; align-self: center;}
  .header__menu a{display: flex; width: 100%; border-bottom: 1px solid #444;}
  .menu-open .header__menu{height: 50vh;}

  .icon-hamburger{height: 68px; width: 68px; margin-left: 40px; padding-top: 5px;}
  .icon-hamburger span{height: 1px; width: 50px; background: #fff; position: relative; display: block; margin-top:20px; transition: all 0.6s cubic-bezier(.215, .61, .355, 1);}

  .menu-open .icon-hamburger span:nth-child(1){transform: rotate(45deg) translateY(15px); margin-left: 10px;}
  .menu-open .icon-hamburger span:nth-child(2){transform: rotate(-45deg) translateY(-15px); margin-left:10px;}

  .header__icons{display: flex; width: 100px; }
}

@media (max-width: 380px){
  .header__logo h1{font-size: 24px;}
  .icon-hamburger{height: 68px; width: 68px; margin-left: 40px; padding-top: 5px;}
  .icon-hamburger span{height: 1px; width: 35px; margin-top:20px;}
}

</style>