<template>

  <Suspense>
    <template #default>
      <div>
        <Navabr></Navabr>
        <h1>{{ $t('temperature') }}</h1>
        <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartDatasets" canvasId="temperatureChart" />
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

  const landData = ref([]);
  const stationData = ref([]);

  const chartDatasets = ref([]);
  const chartLabels = ref([]);
  
  let dataLoaded = ref(false);

  async function loadTemperatureAPI () {
    const { temperatureAPI } = await allAPI();

    temperatureAPI.forEach(obj => {
      chartLabels.value.push(obj.time);
      landData.value.push(obj.land);
      stationData.value.push(obj.station);
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
      
    chartDatasets.value = datasets
    dataLoaded.value = true
  }

  onMounted(() => {
    loadTemperatureAPI();
  });

</script>

<style lang="scss">

</style>