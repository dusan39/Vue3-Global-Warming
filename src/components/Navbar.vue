<template>

  <div>
    <header class="header">
      <div class="header__content">
        <div class="header__logo">
          <routerLink to="/"><img  src="../assets/logo.svg" alt="global-warming"/></routerLink>
        </div>
        <ul class="header__menu" >
          <routerLink :to="{ name: 'Home' }">{{ $t('home') }}</routerLink>
          <routerLink :to="{ name: 'Arctic' }">{{ $t('arctic') }}</routerLink>
          <routerLink :to="{ name: 'Co2' }">{{ $t('co2') }}</routerLink>
          <routerLink :to="{ name: 'Methane' }">{{ $t('methane') }}</routerLink>
          <routerLink :to="{ name: 'No2' }">{{ $t('no2') }}</routerLink>
          <routerLink :to="{ name: 'Temperature' }">{{ $t('temperature') }}</routerLink>
          <button class="menu__language" v-show="locale === 'it'" @click="changeLocale('en')"> <img src="../assets/united-kingdom.svg" alt=""> </button>
          <button class="menu__language" v-show="locale === 'en'" @click="changeLocale('it')"> <img src="../assets/italy.svg" alt=""> </button>
          <div class="darkMode__container">
            <DarkMode></DarkMode>
          </div>    
        </ul>

        <div class="header__icons">
          <button class="menu__language__mobile" v-show="locale === 'it'" @click="changeLocale('en')"> <img src="../assets/united-kingdom.svg" alt=""> </button>
          <button class="menu__language__mobile" v-show="locale === 'en'" @click="changeLocale('it')"> <img src="../assets/italy.svg" alt=""> </button>
          <div class="darkMode__container__mobile">
            <DarkMode></DarkMode>
          </div> 
          <div class="icon-hamburger">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  </div>

</template>

<script setup>
import i18n from '../locales/i18n';
import DarkMode from './DarkMode.vue';
import { useDark, useToggle } from '@vueuse/core';
import { ref } from 'vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);
const locale = ref('en');

  function changeLocale(newLocale) {
    locale.value = newLocale;
    i18n.global.locale = newLocale;
  }

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
  .header__logo a{margin: 0px;}
  .header__logo a img{ width: 48px; height: 48px;}
  .header__menu{padding: 0px; margin: 0px; order: 3; align-self: center;}
  .header__menu a{display: inline-block; opacity: 0.8; font-size: 18px; padding: 10px 20px; text-decoration: none;}
  .header__menu .darkMode__container{display: inline-flex; cursor: pointer;}
  .header__menu .menu__language{margin-right: 20px;}
  .header__menu .menu__language img{display: inline-block;}
  .header__menu button img{width: 50px;}
  .header__icons{width: 50px; order: 2;}
  .header__icons .darkMode__container__mobile{display: none;}
  .header__icons .menu__language__mobile{display: none;}

  @media(min-width: 1201px){
    .header__logo{padding: 10px 10px 10px 0px;}
    .header__menu li:nth-child(4){padding-right: 0px !important;}
  }

  @media (max-width: 910px){
    .header__menu{
      position: absolute;
      top: 60px;
      background-color: #1d1d1f;
      width: 100%;
      height: 100vh;
      height: 0vh;
      overflow: hidden;
      transition: all .5s cubic-bezier(.215, .61, .355, 1);
      z-index: 99999;
    }
    
    .header__logo{padding: 10px 20px; margin: 0px; align-self: center;}
    .header__content{background-color: #1d1d1f;}
    .header__menu .menu__language{display: none;}
    .header__menu a{display: flex; color: #fff !important; width: 100%; border-bottom: 1px solid #444;}
    .header__menu .darkMode__container{display: none;}
    .header__icons .darkMode__container__mobile{display:inline-flex; width: 30px !important;}
    .header__icons .darkMode__container__mobile img{height: auto; width: 30px; max-width: 100%;}
    .header__icons .menu__language__mobile{display: block;}
    .header__icons .menu__language__mobile img{width: 30px; margin-right: 15px;}
    .header__menu button{align-self: center;}
    .menu-open .header__menu{height: 100vh;}

    .icon-hamburger{height: 68px; width: 68px; margin-left: 30px; padding-top: 5px;}
    .icon-hamburger span{height: 1px; width: 50px; background: #fff; position: relative; display: block; margin-top:20px; transition: all 0.6s cubic-bezier(.215, .61, .355, 1);}

    .menu-open .icon-hamburger span:nth-child(1){transform: rotate(45deg) translateY(15px); margin-left: 10px;}
    .menu-open .icon-hamburger span:nth-child(2){transform: rotate(-45deg) translateY(-15px); margin-left:10px;}

    .header__icons{display: flex; width: 170px; }
  }

  @media (max-width: 380px){
    .header__logo h1{font-size: 24px;}
    .icon-hamburger{height: 68px; width: 68px; margin-left: 40px; padding-top: 5px;}
    .icon-hamburger span{height: 1px; width: 35px; margin-top:20px;}
  }

</style>