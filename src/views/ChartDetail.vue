<template>
  <div>
    <div class="detail__container">
      <div class="title__container">
        <h1>{{ $t(id) }}</h1>
      </div>

      <div class="chart__container">
        <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartDatasets" :type="chartType" :animation="chartAnimation" ></Chart>
      </div>

      <div class="info__container">
        <h2>{{ $t(currentTitle.textKey) }}</h2>
        <p>{{ $t(currentDescription.textKey) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from '../components/Chart.vue';
import { useRoute } from 'vue-router'
import { ref, watch, onMounted } from 'vue';
import { arcticData, temperatureData, no2Data, co2Data, methaneData } from '../API';

let dataLoaded = ref(false);
const route = useRoute()
let {id} = route.params

const titleDescription = [
  { name:'arctic', textKey: 'arcticTitle' },
  { name:'co2', textKey: 'co2Title' },
  { name:'methane', textKey: 'methaneTitle' },
  { name:'no2', textKey: 'no2Title' },
  { name:'temperature', textKey: 'temperatureTitle' },
]

const descriptions = [
  { name:'arctic', textKey: 'arcticInfo' },
  { name:'co2', textKey: 'co2Info' },
  { name:'methane', textKey: 'methaneInfo' },
  { name:'no2', textKey: 'no2Info' },
  { name:'temperature', textKey: 'temperatureInfo' },
]

// Chart data
const chartDatasets = ref([]);
const chartLabels = ref([]);
const chartType = ref();
const chartAnimation = ref();

// Arctic data
const areaData = ref([]);
const extentData = ref([]);
const rankData = ref([]);

// Co2 data
const cycleData = ref([]);
const trendDataCo2 = ref([]);

// Methane data
const averageDataMethane = ref([]);
const trendDataMethane = ref([]);

// No2 data
const trendDataNo2 = ref([]);
const averageDataNo2 = ref([]);

// Temperature data
const landData = ref([]);
const stationData = ref([]);

// Secondary title and description variables
let currentTitle = titleDescription.find(item => item.name === id);
let currentDescription = descriptions.find(item => item.name === id);

  async function fetchDataForArctic() {
    const { arcticAPI } = await arcticData();

    arcticAPI.forEach((obj) => {
      const fullDate = obj.month + '/' + obj.year;
      chartLabels.value.push(fullDate);
      areaData.value.push(obj.area);
      rankData.value.push(obj.rank);
      extentData.value.push(obj.extent);
    });

    const datasetsArcitc = [
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

    chartType.value = 'line'
    chartAnimation.value = true
    chartDatasets.value = datasetsArcitc
    dataLoaded.value = true
  }

  async function fetchDataForCo2() {
    const { co2API } = await co2Data();

    co2API.forEach((obj) => {
      const fullDate = obj.month + '/' + obj.year;
      chartLabels.value.push(fullDate);
      cycleData.value.push(obj.cycle);
      trendDataCo2.value.push(obj.trend);
    });

    const datasetsCo2 = [
      {
        labels: chartLabels.value,
        data: cycleData.value,
        label: 'Cycle',
        backgroundColor: '#485696',
        borderColor: '#485696',
      },
      {
        labels: chartLabels.value,
        data: trendDataCo2.value,
        label: 'Trend',
        backgroundColor: '#FC7A1E',
        borderColor: '#FC7A1E',
      },
    ];

    chartType.value = 'line'
    chartAnimation.value = false
    chartDatasets.value = datasetsCo2
    dataLoaded.value = true
  }

  async function fetchDataForMethane() {
    const { methaneAPI } = await methaneData();

    methaneAPI.forEach((obj) => {
      if(obj.date != "#.year"){
        chartLabels.value.push(obj.date);
      }
      averageDataMethane.value.push(obj.average);
      trendDataMethane.value.push(obj.trend);
    });

    const datasetsMethane = [
      {
        labels: chartLabels.value,
        data: averageDataMethane.value,
        label: 'Average',
        backgroundColor: '#ef476f',
        borderColor: '#ef476f',
      },
      {
        labels: chartLabels.value,
        data: trendDataMethane.value,
        label: 'Trend',
        backgroundColor: '#073b4c',
        borderColor: '#073b4c',
      },
    ];

    chartType.value = 'line'
    chartAnimation.value = true
    chartDatasets.value = datasetsMethane
    dataLoaded.value = true
  }

  async function fetchDataForNo2() {
    const { no2API } = await no2Data();

    no2API.forEach((obj) => {
      if(obj.date != "#.year"){
        chartLabels.value.push(obj.date);
      }
      trendDataNo2.value.push(obj.trend);
      averageDataNo2.value.push(obj.average);
    });

    const datasetsNo2 = [
      {
        labels: chartLabels.value,
        data: trendDataNo2.value,
        label: 'Trend',
        backgroundColor: '#2D898B',
        borderColor: '#2D898B',
      },
      {
        labels: chartLabels.value,
        data: averageDataNo2.value,
        label: 'Average',
        backgroundColor: '#88CCF1',
        borderColor: '#88CCF1',
      },
    ];

    chartType.value = 'line'
    chartAnimation.value = true
    chartDatasets.value = datasetsNo2
    dataLoaded.value = true

  }

  async function fetchDataForTemperature() {
    const { temperatureAPI } = await temperatureData()

    temperatureAPI.forEach((obj) => {
      chartLabels.value.push(obj.time);
      landData.value.push(obj.land);
      stationData.value.push(obj.station);
    });

    const datasetsTemperature = [
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

    chartType.value = 'line'
    chartAnimation.value = true
    chartDatasets.value = datasetsTemperature
    dataLoaded.value = true  
  }

  function changeChart () {
    const newId = route.params.id
    chartDatasets.value = []
    chartLabels.value = []
    dataLoaded.value = false
    id = newId
    currentTitle.textKey = newId 

    let funcs = {
      'arctic': fetchDataForArctic,
      'co2': fetchDataForCo2,
      'methane': fetchDataForMethane,
      'no2': fetchDataForNo2,
      'temperature': fetchDataForTemperature
    }

    if(funcs[id]){
      funcs[id]() 
    }else{
      console.log('Back home')
    }
    
    let titleDescription = {  
      'arctic': 'arcticTitle',
      'co2': 'co2Title',
      'methane': 'methaneTitle',
      'no2': 'no2Title',
      'temperature': 'temperatureTitle'  
    }

    let description = {  
      'arctic': 'arcticInfo',
      'co2': 'co2Info',
      'methane': 'methaneInfo',
      'no2': 'no2Info',
      'temperature': 'temperatureInfo'  
    }

    currentDescription.textKey = description[id]
    currentTitle.textKey = titleDescription[id]
    currentDescription.name = newId
  }

  onMounted(changeChart)
  
  watch(() => route.params, changeChart);

</script>

<style lang="scss">

  .detail__container{
    max-width: 1200px; width: 100%;
    margin: 0 auto;
    margin-bottom: 5%;

    .title__container{
      display: flex;
      justify-content: center;
      padding-bottom: 2%;
    }

    .chart__container{
      display: flex;
      justify-content: center;
    }

    .info__container{
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
  }

</style>