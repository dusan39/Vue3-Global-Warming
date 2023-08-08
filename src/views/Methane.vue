<template>

  <div>
    <div class="methane__container">
      <div class="title__container">
        <h1>{{ $t('methane') }}</h1>
      </div>
      
      <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartDatasets" canvasId="methaneChart" :type="chartType" :animation="chartAnimation" />

      <div class="data__container">
        <div class="desctiption__container">
          <div class="description__container">
          <h2>Methane information</h2>
          <p>
            {{ $t('chartInfo') }} <b>{{ firstYear }}</b> {{ $t('to') }} <b>{{ lastYear }}</b>. <br> {{ $t('methaneInfo') }}
          </p>
        </div>
        </div>

        <div class="average__container">
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
import { methaneData } from '../API';
import { averageCalculator } from '../composables/average';
import Chart from '../components/Chart.vue';

  const isDark = useDark()

  const averageData = ref([]);
  const trendData = ref([]);

  const chartDatasets = ref([]);
  const chartLabels = ref([]);

  let counterData = 0;

  let trendAverage = ref();
  let firstYear = ref();
  let lastYear = ref();

  const chartType = ref();
  const chartAnimation = ref();
  
  let dataLoaded = ref(false);

  async function loadMethaneAPI () {
    const { methaneAPI } = await methaneData();
    let totalTrend = 0;

    methaneAPI.forEach((obj, index, array) => {
      const parsedTrend = parseFloat(obj.trend);

      if(obj.date != "#.year"){
        chartLabels.value.push(obj.date);
      }
      averageData.value.push(obj.average);
      trendData.value.push(obj.trend);

      counterData++;

      if (!isNaN(parsedTrend)) {
        totalTrend += parsedTrend;
      }

      if (index === 1) {
        firstYear = obj.date 
      }

      if (index === array.length - 1) {
        lastYear = obj.date 
      }
    });

    const datasets = [
      {
        labels: chartLabels.value,
        data: averageData.value,
        label: 'Average',
        backgroundColor: '#ef476f',
        borderColor: '#ef476f',
      },
      {
        labels: chartLabels.value,
        data: trendData.value,
        label: 'Trend',
        backgroundColor: '#073b4c',
        borderColor: '#073b4c',
      },
    ];

    trendAverage = averageCalculator(totalTrend, counterData)
    trendAverage = trendAverage.average.value

    chartType.value = 'line'
    chartAnimation.value = true
    
    chartDatasets.value = datasets
    dataLoaded.value = true
  }

  onMounted(loadMethaneAPI)

</script>

<style lang="scss">

  .methane__container{
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
        grid-template-columns: repeat(2, 1fr);

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
      .methane__container{
        width: auto;
        margin-right: 20px;
        margin-left: 20px;
      }
    }
  }

  @media screen and (max-width: 650px) {
  
    .methane__container{

      .data__container{

        .description__container{
          margin: 10px;
        }

        .average__container{

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
            margin-right: 10px;
          }  
        }
      }      
    }
  }

</style>