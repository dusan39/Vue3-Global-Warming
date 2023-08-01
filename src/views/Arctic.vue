<template>
    <div>
      <div class="arctic__container">

        <div class="title__container">
          <h1>{{ $t('arctic') }}</h1>
        </div>

        <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartDatasets" canvasId="arcticChart" :type="chartType" :animation="chartAnimation" />

        <div class="media__container">

          <div class="media__item">
            <img v-show="isDark === true" src="../assets/arctic/area/area-dark.svg" alt="">
            <img v-show="isDark === false" src="../assets/arctic/area/area-light.svg" alt="">
            <h3>{{ areaMediaRounded }}</h3>
            <h2>{{ $t('areaAverage') }}</h2>
          </div>
          
          <div class="media__item">
            <img v-show="isDark === true" src="../assets/arctic/rank/rank-dark.svg" alt="">
            <img v-show="isDark === false" src="../assets/arctic/rank/rank-light.svg" alt="">
            <h3>{{ rankMediaRounded }}</h3>
            <h2>{{ $t('rankAverage') }}</h2>
          </div>
          
          <div class="media__item">
            <img v-show="isDark === true" src="../assets/arctic/extent/extent-dark.svg" alt="">
            <img v-show="isDark === false" src="../assets/arctic/extent/extent-light.svg" alt="">
            <h3>{{ extentMediaRounded }}</h3>
            <h2>{{ $t('extentAverage') }}</h2>
          </div>
          
          <div class="media__item">
            <img v-show="isDark === true" src="../assets/arctic/calendar/calendar-dark.svg" alt="">
            <img v-show="isDark === false" src="../assets/arctic/calendar/calendar-light.svg" alt="">
            <h3>{{ lastYear }}</h3>
            <h2>{{ $t('latestData') }}</h2>
          </div>

        </div>
        </div>

        <Footer></Footer>
    </div>
       

</template>

<script setup>

import { ref, onMounted } from 'vue';
import { arcticData } from '../API';
import Chart from '../components/Chart.vue';
import Footer from '../components/Footer.vue';

import { useDark } from '@vueuse/core';
const isDark = useDark()

  const areaData = ref([]);
  const extentData = ref([]);
  const rankData = ref([]);

  const chartDatasets = ref([]);
  const chartLabels = ref([]);

  const chartType = ref();
  const chartAnimation = ref();

  let counterData = 0;

  let areaMedia = ref();
  let areaMediaRounded = ref();
  let rankMedia = ref();
  let rankMediaRounded = ref();
  let extentMedia = ref();
  let extentMediaRounded = ref();
  let lastYear = ref();
  
  let dataLoaded = ref(false);

  async function loadArcticAPI () {
    const { arcticAPI } = await arcticData();
    let totalArea = 0;
    let totalRank = 0;
    let totalExtent = 0;
  
    arcticAPI.forEach((obj, index, array) => {
      const parsedArea = parseFloat(obj.area);
      const parsedRank = parseFloat(obj.rank);
      const parsedExtent = parseFloat(obj.extent);

      const fullDate = obj.month + '/' + obj.year;
      chartLabels.value.push(fullDate);
      areaData.value.push(obj.area);
      rankData.value.push(obj.rank);
      extentData.value.push(obj.extent);
       
      counterData++;

      if (!isNaN(parsedArea)) {
        totalArea += parsedArea;
      }

      if (!isNaN(parsedRank)) {
        totalRank += parsedRank;
      }

      if (!isNaN(parsedExtent)) {
        totalExtent += parsedExtent;
      }

      if (index === array.length - 1) {
        lastYear = obj.year 
      }
    });

    const datasets = [
      {
        labels: chartLabels.value,
        data: areaData.value,
        label: 'Area',
        backgroundColor: '#a8dadc',
        borderColor: '#a8dadc',
      },
      {
        labels: chartLabels.value,
        data: rankData.value,
        label: 'Rank',
        backgroundColor: '#19A7CE',
        borderColor: '#19A7CE',
      },
      {
        labels: chartLabels.value,
        data: extentData.value,
        label: 'Extent',
        backgroundColor: '#FFA500',
        borderColor: '#FFA500',
      },
    ];

    areaMedia.value = totalArea/counterData
    areaMediaRounded = parseFloat(areaMedia.value.toFixed(2))

    rankMedia.value = totalRank/counterData
    rankMediaRounded = parseFloat(rankMedia.value.toFixed(2))

    extentMedia.value = totalExtent/counterData
    extentMediaRounded = parseFloat(extentMedia.value.toFixed(2))
      
    chartType.value = 'line'
    chartAnimation.value = true

    chartDatasets.value = datasets
    dataLoaded.value = true
  }

  onMounted(loadArcticAPI)

</script>

<style lang="scss">

  .arctic__container{
    max-width: 1200px; width: 100%;
    margin: 0 auto;

    .title__container{
      display: flex;
      justify-content: center;
      padding-bottom: 2%;
    }

    .media__container{
      display: grid;
      grid-template-columns: repeat(4, 1fr);

      .media__item{
        border-radius: 30px;
        padding: 30px;
        margin-top: 20px;
        margin-right: 10px;
        margin-left: 10px;
        background: rgba(255, 255, 255, .1);
        box-shadow: 0 25px 45px rgba(0, 0, 0, .2);
        border: 2px solid rgba(255, 255, 255, .5);
        backdrop-filter: blur(15px);
        display: flex;
        flex-direction: column;
        align-items: center;

        img{
          width: 80px;
        }

        h3{
          font-size: 26px;
          font-weight: bold;
          text-align: center;
        }

        h2{
          text-align: center;
        }
      }

      .media__item:first-child{
        margin-left: 0px;
      }

      .media__item:nth-last-child(1){
        margin-right: 0px;
      }
    }
  }

  @media screen and (max-width: 910px) {
    .arctic__container {

      .media__container {
        display: block;

      .media__item{ 
        padding: 10px;
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 20px; 
      }

      .media__item:first-child{
        margin-left: 20px;
      }

      .media__item:nth-last-child(1){
        margin-right: 20px;
      }
      }
    }
  }

</style>