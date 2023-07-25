<template>

  <div>
    <Navabr></Navabr>
    <h1>{{ $t('co2') }}</h1>
    <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartDatasets" canvasId="arcticChart" />
  </div>   

</template>

<script setup>

import { ref, onMounted } from 'vue';
import { allAPI } from '../API';
import Navabr from '../components/Navbar.vue'
import Chart from '../components/Chart.vue';

  const cycleData = ref([]);
  const trendData = ref([]);

  const chartDatasets = ref([]);
  const chartLabels = ref([]);
  
  let dataLoaded = ref(false);

  async function loadCo2API () {
    const { co2API } = await allAPI();

    co2API.forEach(obj => {
      const fullDate = obj.day + '/' + obj.month + '/' + obj.year;
      chartLabels.value.push(fullDate);
      cycleData.value.push(obj.cycle)
      trendData.value.push(obj.trend);
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
    
    chartDatasets.value = datasets
    dataLoaded.value = true
  }

  onMounted(() => {
    loadCo2API();
  });

</script>

<style lang="scss">

</style>