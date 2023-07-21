<template>

  <Suspense>
    <template #default>
      <div>
        <Navabr></Navabr>
        <h1>Methane</h1>
        <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartDatasets" canvasId="methaneChart" />
        <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="datasetsUnc" canvasId="methaneUncChart" />
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

  const averageData = ref([]);
  const trendData = ref([]);
  
  const averageUncData = ref([]);
  const trendUncData = ref([]);

  const chartDatasets = ref([]);
  const chartLabels = ref([]);

  const chartUncDatasets = ref([]);
  
  let dataLoaded = ref(false);

  async function loadMethaneAPI () {
    const { methaneAPI } = await allAPI();

    console.log(methaneAPI)

    methaneAPI.forEach(obj => {
      chartLabels.value.push(obj.date);
      averageData.value.push(obj.average);
      trendData.value.push(obj.trend);
      averageUncData.value.push(obj.averageUnc);
      trendUncData.value.push(obj.trendUnc)
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

    const datasetsUnc = [
      {
        labels: chartLabels.value,
        data: averageUncData.value,
        label: 'Average Unc',
        backgroundColor: '#ef476f',
        borderColor: '#ef476f',
      },
      {
        labels: chartLabels.value,
        data: trendUncData.value,
        label: 'Trend Unc',
        backgroundColor: '#073b4c',
        borderColor: '#073b4c',
      },
    ];
    
    chartDatasets.value = datasets
    chartUncDatasets.value = datasetsUnc
    dataLoaded.value = true
  }

  onMounted(() => {
    loadMethaneAPI();
  });

</script>

<style lang="scss">

</style>