<template>
    <div>
      <div class="arctic__container">
        <div class="title__container">
          <h1>{{ $t('arctic') }}</h1>
        </div>

        <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartDatasets" canvasId="arcticChart" :type="chartType" :animation="chartAnimation" />

        <div class="data__container">
          <div class="description__container">
            <h2>{{ $t('arcticTitle') }}</h2>
            <p>
              {{ $t('chartInfo') }} <b>{{ firstYear }}</b> {{ $t('to') }} <b>{{ lastYear }}</b>. <br> {{$t('arcticInfo') }}
            </p>
          </div>

          <div class="average__container">
            <div class="average__item">
              <img v-show="isDark === true" src="../assets/arctic/area/area-dark.svg" alt="">
              <img v-show="isDark === false" src="../assets/arctic/area/area-light.svg" alt="">
              <h3>{{ areaAverage }}</h3>
              <h2>{{ $t('areaAverage') }}</h2>
            </div>
            
            <div class="average__item">
              <img v-show="isDark === true" src="../assets/arctic/rank/rank-dark.svg" alt="">
              <img v-show="isDark === false" src="../assets/arctic/rank/rank-light.svg" alt="">
              <h3>{{ rankAverage }}</h3>
              <h2>{{ $t('rankAverage') }}</h2>
            </div>
            
            <div class="average__item">
              <img v-show="isDark === true" src="../assets/arctic/extent/extent-dark.svg" alt="">
              <img v-show="isDark === false" src="../assets/arctic/extent/extent-light.svg" alt="">
              <h3>{{ extentAverage }}</h3>
              <h2>{{ $t('extentAverage') }}</h2>
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
import { arcticData } from '../API';
import { useAverageCalculator } from '../composables/average';
import Chart from '../components/Chart.vue';

  const isDark = useDark()

  const areaData = ref([]);
  const extentData = ref([]);
  const rankData = ref([]);

  const chartDatasets = ref([]);
  const chartLabels = ref([]);

  const chartType = ref();
  const chartAnimation = ref();

  let counterData = 0;

  let areaAverage = ref();
  let rankAverage = ref();
  let extentAverage = ref();
  let firstYear = ref();
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
    
    areaAverage = useAverageCalculator(totalArea, counterData)
    areaAverage = areaAverage.average.value
    
    rankAverage = useAverageCalculator(totalRank, counterData)
    rankAverage = rankAverage.average.value

    extentAverage = useAverageCalculator(totalExtent, counterData)
    extentAverage = extentAverage.average.value
      
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
          font-size: 28px;
          font-weight: bold;
        }
      }

      .average__container{
        display: grid;
        grid-template-columns: repeat(4, 1fr);

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
            font-size: 26px;
            font-weight: bold;
            text-align: center;
          }

          h2{
            text-align: center;
          }
        }

        .average__item:first-child{
          margin-left: 0px;
        }

        .average__item:nth-last-child(1){
          margin-right: 0px;
        }
      }
    }
  }

  @media screen and (max-width: 910px) {
    .arctic__container {

      .average__container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);

        .average__item{ 
          padding: 10px;
          margin: 20px;

          img{
            width: 50px;
          }

          h3{
            font-size: 20px;
          }

          h2{
            text-align: center;
            font-size: 14px;
          }
        }

        .average__item:first-child{
          margin-left: 20px;
        }

        .average__item:nth-last-child(1){
          margin-right: 20px;
        }
      }
    }
  } 

  @media screen and (min-width: 911px) and (max-width: 1200px){
    div{
      .arctic__container{
        width: auto;
        margin-right: 20px;
        margin-left: 20px;
      }
    }
  }

  @media screen and (min-width: 677px) and (max-width: 911px) {
  
    .arctic__container{

      .data__container{

        .average__container{

          .average__item{
            margin: 15px;
          }

          .average__item:first-child{
              margin-left: 15px;
          }

          .average__item:nth-last-child(1){
            margin-right: 15px;
          }  
        }
      }      
    }
  }

  @media screen and (max-width: 677px) {
  
    .arctic__container{

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
            margin-right: 10px;
          }  
        }
      }      
    }
  }

</style>