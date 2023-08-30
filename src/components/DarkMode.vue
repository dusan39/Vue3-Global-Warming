<template>

  <img class="dark__mode" src="../assets/navbar/sun.svg" v-show="isDark === true" @click="toggleDark()" alt="">
  <img class="dark__mode__desktop" src="../assets/navbar/moon.svg" v-show="isDark === false" @click="toggleDark()" alt="">
  <img class="dark__mode__mobile" src="../assets/navbar/moon-mobile.svg" v-show="isDark === false" @click="toggleDark()" alt="">

</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

</script>

<style lang="scss" scoped>

  img{
    width: 30px;
  }

  @media (max-width: 910px){
    .dark__mode__desktop{
      display: none;
    }
  }

  @media (min-width: 910px){
    .dark__mode__mobile{
      display: none;
    }
  }

</style>