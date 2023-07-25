<template>

  <div>
    <Navabr></Navabr>
    <h1>{{ $t('methane') }}</h1>
    <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartDatasets" canvasId="methaneChart" />
  </div>   

</template>

<script setup>

import { ref, onMounted } from 'vue';
import { allAPI } from '../API';
import Navabr from '../components/Navbar.vue'
import Chart from '../components/Chart.vue';

  const averageData = ref([]);
  const trendData = ref([]);

  const chartDatasets = ref([]);
  const chartLabels = ref([]);
  
  let dataLoaded = ref(false);

  async function loadMethaneAPI () {
    const { methaneAPI } = await allAPI();

    console.log(methaneAPI)

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
    
    chartDatasets.value = datasets
    dataLoaded.value = true
  }

  onMounted(() => {
    loadMethaneAPI();
  });

</script>

<style lang="scss">

</style>