<template>

  <div>
    <div class="co2__container">
      <div class="title__container">
        <h1>{{ $t('co2') }}</h1>
      </div>
      
      <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartDatasets" canvasId="co2Chart" :type="chartType" :animation="chartAnimation" />

      <div class="data__container">
        <div class="average__container">
          <div class="average__item">
            <img v-show="isDark === true" src="../assets/co2/cycle/cycle-dark.svg" alt="">
            <img v-show="isDark === false" src="../assets/co2/cycle/cycle-light.svg" alt="">
            <h3>{{ cycleAverageRounded }}</h3>
            <h2>{{ $t('cycleAverage') }}</h2>
          </div>
          
          <div class="average__item">
            <img v-show="isDark === true" src="../assets/co2/trend/trend-dark.svg" alt="">
            <img v-show="isDark === false" src="../assets/co2/trend/trend-light.svg" alt="">
            <h2>{{ trendAverageRounded }}</h2>
            <h2>{{ $t('trendAverage') }}</h2>
          </div>
          
          <div class="average__item">
            <img v-show="isDark === true" src="../assets/arctic/calendar/calendar-dark.svg" alt="">
            <img v-show="isDark === false" src="../assets/arctic/calendar/calendar-light.svg" alt="">
            <h2>{{ lastYear }}</h2>
            <h2>{{ $t('latestData') }}</h2>
          </div>
        </div>

        <div class="description__container">

        </div>
      </div>
    </div>
  </div>   

</template>

<script setup>

import { ref, onMounted } from 'vue';
import { co2Data } from '../API';
import Chart from '../components/Chart.vue';
import { useDark } from '@vueuse/core';

  const isDark = useDark()

  const cycleData = ref([]);
  const trendData = ref([]);

  const chartDatasets = ref([]);
  const chartLabels = ref([]);

  const chartType = ref();
  const chartAnimation = ref();

  let counterData = 0;

  let cycleAverage = ref();
  let cycleAverageRounded = ref();
  let trendAverage = ref();
  let trendAverageRounded = ref();
  let lastYear = ref();
  
  let dataLoaded = ref(false);

  async function loadCo2API () {
    const { co2API } = await co2Data();
    let totalCycle = 0;
    let totalTrend = 0;

    console.log(co2API)

    co2API.forEach((obj, index, array) => {
      const parsedCycle = parseFloat(obj.cycle);
      const parsedTrend = parseFloat(obj.trend);

      const fullDate = obj.day + '/' + obj.month + '/' + obj.year;
      chartLabels.value.push(fullDate);
      cycleData.value.push(obj.cycle)
      trendData.value.push(obj.trend);

      counterData++;

      if (!isNaN(parsedCycle)) {
        totalCycle += parsedCycle;
      }

      if (!isNaN(parsedTrend)) {
        totalTrend += parsedTrend;
      }

      if (index === array.length - 1) {
        lastYear = obj.year 
      }
    });

    const datasets = [
      {
        labels: chartLabels.value,
        data: cycleData.value,
        label: 'Cycle',
        backgroundColor: '#aec3b0',
        borderColor: '#aec3b0',
      },
      {
        labels: chartLabels.value,
        data: trendData.value,
        label: 'Trend',
        backgroundColor: '#124559',
        borderColor: '#124559',
      },
    ];

    cycleAverage.value = totalCycle/counterData
    cycleAverageRounded = parseFloat(cycleAverage.value.toFixed(2))

    trendAverage.value = totalTrend/counterData
    trendAverageRounded = parseFloat(trendAverage.value.toFixed(2))

    chartType.value = 'line'
    chartAnimation.value = false
    
    chartDatasets.value = datasets
    dataLoaded.value = true
  }

  onMounted(loadCo2API)

</script>

<style lang="scss">

  .co2__container{
    max-width: 1200px; width: 100%;
    margin: 0 auto;

    .title__container{
      display: flex;
      justify-content: center;
      padding-bottom: 2%;
    }

    .data__container{

      .average__container{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        
        .average__item{
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
        }
      }
    }
  }

</style>