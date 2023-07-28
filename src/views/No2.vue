<template>

  <div>
    <h1>{{ $t('no2') }}</h1>
    <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartDatasets" canvasId="no2Chart" :type="chartType" :animation="chartAnimation" />
  </div>   

</template>

<script setup>

import { ref, onMounted } from 'vue';
import { no2Data } from '../API';
import Navabr from '../components/Navbar.vue'
import Chart from '../components/Chart.vue';

  const averageData = ref([]);
  const trendData = ref([]);

  const chartDatasets = ref([]);
  const chartLabels = ref([]);

  const chartType = ref();
  const chartAnimation = ref();

  let dataLoaded = ref(false);

  async function loadNo2API () {
    const { no2API } = await no2Data();

    no2API.forEach(obj => {
      if(obj.date != "#.year"){
        chartLabels.value.push(obj.date);
      }
      averageData.value.push(obj.average);
      trendData.value.push(obj.trend);
    });

    const datasets = [
      {
        labels: chartLabels.value,
        data: averageData.value,
        label: 'Average',
        backgroundColor: '#f1faee',
        borderColor: '#f1faee',
      },
      {
        labels: chartLabels.value,
        data: trendData.value,
        label: 'Trend',
        backgroundColor: '#a8dadc',
        borderColor: '#a8dadc',
      }
    ];

    chartType.value = 'line'
    chartAnimation.value = true
      
    chartDatasets.value = datasets
    dataLoaded.value = true
  }

  onMounted(loadNo2API)

</script>

<style lang="scss">

</style>