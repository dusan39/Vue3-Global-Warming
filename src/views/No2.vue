<template>

  <Suspense>
    <template #default>
      <div>
        <Navabr></Navabr>
        <h1>No2</h1>
        <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartDatasets" canvasId="no2Chart" />
        <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartUncDatasets" canvasId="no2UncChart" />
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

  async function loadNo2API () {
    const { no2API } = await allAPI();

    no2API.forEach(obj => {
      chartLabels.value.push(obj.date);
      averageData.value.push(obj.average);
      trendData.value.push(obj.trend);
      averageUncData.value.push(obj.averageUnc);
      trendUncData.value.push(obj.trendUnc);
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

    const datasetsUnc = [
      {
        labels: chartLabels.value,
        data: averageUncData.value,
        label: 'Average Unc',
        backgroundColor: '#457b9d',
        borderColor: '#457b9d',
      },
      {
        labels: chartLabels.value,
        data: trendUncData.value,
        label: 'Trend Unc',
        backgroundColor: '#1d3557',
        borderColor: '#1d3557',
      },
    ];
      
    chartDatasets.value = datasets
    chartUncDatasets.value = datasetsUnc
    dataLoaded.value = true

  }

  onMounted(() => {
    loadNo2API();
  });

</script>

<style lang="scss">

</style>