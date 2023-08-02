<template>

  <div>
    <h1>{{ $t('methane') }}</h1>
    <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartDatasets" canvasId="methaneChart" :type="chartType" :animation="chartAnimation" />
  </div>   

</template>

<script setup>

import { ref, onMounted } from 'vue';
import { methaneData } from '../API';
import Chart from '../components/Chart.vue';

  const averageData = ref([]);
  const trendData = ref([]);

  const chartDatasets = ref([]);
  const chartLabels = ref([]);

  const chartType = ref();
  const chartAnimation = ref();
  
  let dataLoaded = ref(false);

  async function loadMethaneAPI () {
    const { methaneAPI } = await methaneData();

    methaneAPI.forEach(obj => {
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

    chartType.value = 'line'
    chartAnimation.value = true
    
    chartDatasets.value = datasets
    dataLoaded.value = true
  }

  onMounted(loadMethaneAPI)

</script>

<style lang="scss">

</style>