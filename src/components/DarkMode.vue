<template>
  <img id="dark__mode" src="../assets/navbar/sun.svg" v-show="isDark === true" @click="toggleDark()" alt="">
  <img id="dark__mode" src="../assets/navbar/moon.svg" v-show="isDark === false" @click="toggleDark()" alt="">
  <img id="dark__mode" src="../assets/navbar/moon-mobile.svg" v-show="isDark === false" @click="toggleDark()" alt="">
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

</script>

<style lang="scss">

  img{
    width: 30px;
  }

  @media (min-width: 910px){
    img:nth-child(3){
      display: none;
    }
  }


  @media (max-width: 910px){
    img:nth-child(2){
      display: none;
    }
  }

</style>