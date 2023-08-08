<template>

  <div>
    <div class="co2__container">
      <div class="title__container">
        <h1>{{ $t('co2') }}</h1>
      </div>
      
      <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartDatasets" canvasId="co2Chart" :type="chartType" :animation="chartAnimation" />

      <div class="data__container">
        <div class="description__container">
          <h2>{{ $t('co2Title') }}</h2>
          <p>
            {{ $t('chartInfo') }} <b>{{ firstYear }}</b> {{ $t('to') }} <b>{{ lastYear }}</b>. <br> {{ $t('co2Info') }}
          </p>
        </div>

        <div class="average__container">
          <div class="average__item">
            <img v-show="isDark === true" src="../assets/co2/cycle/cycle-dark.svg" alt="">
            <img v-show="isDark === false" src="../assets/co2/cycle/cycle-light.svg" alt="">
            <h3>{{ cycleAverage }}</h3>
            <h2>{{ $t('cycleAverage') }}</h2>
          </div>
          
          <div class="average__item">
            <img v-show="isDark === true" src="../assets/co2/trend/trend-dark.svg" alt="">
            <img v-show="isDark === false" src="../assets/co2/trend/trend-light.svg" alt="">
            <h3>{{ trendAverage }}</h3>
            <h2>{{ $t('trendAverage') }}</h2>
          </div>
          
          <div class="average__item">
            <img v-show="isDark === true" src="../assets/arctic/calendar/calendar-dark.svg" alt="">
            <img v-show="isDark === false" src="../assets/arctic/calendar/calendar-light.svg" alt="">
            <h3>{{ lastYear }}</h3>
            <h2>{{ $t('latestData') }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>   

</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useDark } from '@vueuse/core';
import { co2Data } from '../API';
import { averageCalculator } from '../composables/average';
import Chart from '../components/Chart.vue';

  const isDark = useDark();

  const cycleData = ref([]);
  const trendData = ref([]);

  const chartDatasets = ref([]);
  const chartLabels = ref([]);

  const chartType = ref();
  const chartAnimation = ref();

  let counterData = 0;

  let cycleAverage = ref();
  let trendAverage = ref();
  let firstYear = ref();
  let lastYear = ref();
  
  let dataLoaded = ref(false);

  async function loadCo2API () {
    const { co2API } = await co2Data();
    let totalCycle = 0;
    let totalTrend = 0;

    co2API.forEach((obj, index, array) => {
      const parsedCycle = parseFloat(obj.cycle);
      const parsedTrend = parseFloat(obj.trend);

      const fullDate = obj.month + '/' + obj.year;
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

      if (index === 0) {
        firstYear = obj.year 
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
        backgroundColor: '#485696',
        borderColor: '#485696',
      },
      {
        labels: chartLabels.value,
        data: trendData.value,
        label: 'Trend',
        backgroundColor: '#FC7A1E',
        borderColor: '#FC7A1E',
      },
    ];

    cycleAverage = averageCalculator(totalCycle, counterData)
    cycleAverage = cycleAverage.average.value

    trendAverage = averageCalculator(totalTrend, counterData)
    trendAverage = trendAverage.average.value

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
    margin-bottom: 5%;

    .title__container{
      display: flex;
      justify-content: center;
      padding-bottom: 2%;
    }

    .data__container{

      .description__container{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
        text-align: center;

        h2{
          font-size: 24px;
          font-weight: bold;
        }
      }

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

          h3{
            font-weight: bold;
          }

          h2{
            text-align: center;
          }
        }
      }
    }
  }

  @media screen and (min-width: 911px) and (max-width: 1200px){
    div{
      .co2__container{
        width: auto;
        margin-right: 20px;
        margin-left: 20px;
      }
    }
  }

  @media screen and (max-width: 650px) {
  
    .co2__container{

      .data__container{

        .description__container{
          margin: 10px;
        }

        .average__container{
          grid-template-columns: repeat(2, 1fr);

        .average__item{
          padding: 10px;
          margin: 10px;

            img{
              width: 40px;
            }

            h3{
              font-size: 20px;
            }

            h2{
              font-size: 18px;
            }
          } 
        
          .average__item:first-child{
              margin-left: 10px;
          }

          .average__item:nth-last-child(1){
            grid-column: 1 / 3;
            margin-right: 10px;
          }  
        }
      }      
    }
  }

</style>