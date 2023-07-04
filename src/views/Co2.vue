<template>

  <Suspense>
    <template #default>
      <div>
        <Navabr></Navabr>
        <h1>Co2</h1>
        <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartDatasets" canvasId="arcticChart" />
      </div>   
    </template>
    <template #fallback>
      <ChartSkeleton/>
    </template>
  </Suspense> 

</template>

<script setup>

import { ref, onMounted } from 'vue';
import { allAPI } from '../API';
import Navabr from '../components/Navbar.vue'
import Chart from '../components/Chart.vue';
import ChartSkeleton from '../components/ChartSkeleton.vue';

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
      backgroundColor: '#19A7CE',
      borderColor: '#19A7CE',
    },
    {
      labels: chartLabels.value,
      data: trendData.value,
      label: 'Trend',
      backgroundColor: '#FFA500',
      borderColor: '#FFA500',
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