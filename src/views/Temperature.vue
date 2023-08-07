<template>

  <div>
    <div class="temperature__container">
      <div class="title__container">
        <h1>{{ $t('temperature') }}</h1>
      </div>
      
      <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartDatasets" canvasId="temperatureChart" :type="chartType" :animation="chartAnimation" />

      <div class="data__container">
        <div class="description__container">
          <h2>{{ $t('temperatureTitle') }}</h2>
          <p>
            {{ $t('chartInfo') }} <b>{{ firstYear }}</b> {{ $t('to') }} <b>{{ lastYear }}</b>. <br> {{ $t('temperatureInfo') }}
          </p>
        </div>

        <div class="average__container">
          <div class="average__item">
            <img v-show="isDark === true" src="../assets/temperature/land/land-dark.svg" alt="">
            <img v-show="isDark === false" src="../assets/temperature/land/land-light.svg" alt="">
            <h3>{{ landAverage }}</h3>
            <h2>{{ $t('averageLand') }}</h2>
          </div>
          
          <div class="average__item">
            <img v-show="isDark === true" src="../assets/temperature/station/station-dark.svg" alt="">
            <img v-show="isDark === false" src="../assets/temperature/station/station-light.svg" alt="">
            <h3>{{ stationAverage }}</h3>
            <h2>{{ $t('averageStation') }}</h2>
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
import { temperatureData } from '../API';
import { averageCalculator } from '../composables/average';
import Chart from '../components/Chart.vue';

  const isDark = useDark();

  const landData = ref([]);
  const stationData = ref([]);

  const chartDatasets = ref([]);
  const chartLabels = ref([]);

  const chartType = ref();
  const chartAnimation = ref();

  let counterData = 0;

  let landAverage = ref();
  let stationAverage = ref();
  let firstYear = ref();
  let lastYear = ref();
  
  let dataLoaded = ref(false);

  async function loadTemperatureAPI () {
    const { temperatureAPI } = await temperatureData();
    let totalLand = 0;
    let totalStation = 0;

    temperatureAPI.forEach((obj, index, array) => {
      const parsedLand = parseFloat(obj.land);
      const parsedStation = parseFloat(obj.station);

      chartLabels.value.push(obj.time);
      landData.value.push(obj.land);
      stationData.value.push(obj.station);

      counterData++;

      if (!isNaN(parsedLand)) {
        totalLand += parsedLand;
      }

      if (!isNaN(parsedStation)) {
        totalStation += parsedStation;
      }

      if (index === 0) {
        firstYear = obj.time
      }

      if (index === array.length - 1) {
        lastYear = obj.time
      }
    });

    const datasets = [
      {
        labels: chartLabels.value,
        data: landData.value,
        label: 'Land',
        backgroundColor: '#19A7CE',
        borderColor: '#19A7CE',
      },
      {
        labels: chartLabels.value,
        data: stationData.value,
        label: 'Station',
        backgroundColor: '#146C94',
        borderColor: '#146C94',
      }
    ];

    landAverage = averageCalculator(totalLand, counterData)
    landAverage = landAverage.average.value
    
    stationAverage = averageCalculator(totalStation, counterData)
    stationAverage = stationAverage.average.value

    chartType.value = 'line'
    chartAnimation.value = true
      
    chartDatasets.value = datasets
    dataLoaded.value = true
  }

  onMounted(loadTemperatureAPI)

</script>

<style lang="scss">

.temperature__container{
    max-width: 1200px; width: 100%;
    margin: 0 auto;

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
      .temperature__container{
        width: auto;
        margin-right: 20px;
        margin-left: 20px;
      }
    }
  }

  @media screen and (max-width: 650px) {
  
    .temperature__container{

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