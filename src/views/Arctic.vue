<template>

  <Suspense>
    <template #default>
      <div>
        <Navabr></Navabr>
        <h1>Arctic</h1>
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

  const areaData = ref([]);
  const extentData = ref([]);
  const rankData = ref([]);

  const chartDatasets = ref([]);
  const chartLabels = ref([]);
  
  let dataLoaded = ref(false);

  async function loadArcticAPI () {
    const { arcticAPI } = await allAPI();

    console.log(arcticAPI)

    arcticAPI.forEach(obj => {
      const fullDate = obj.month + '/' + obj.year;
      chartLabels.value.push(fullDate);
      areaData.value.push(obj.area)
      rankData.value.push(obj.rank);
      extentData.value.push(obj.extent);
    });

    const datasets = [
    {
      labels: chartLabels.value,
      data: areaData.value,
      label: 'Area',
      backgroundColor: '#FFC0CB',
      borderColor: '#FFC0CB',
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
    
    chartDatasets.value = datasets
    dataLoaded.value = true
  }

  onMounted(() => {
    loadArcticAPI();
  });

</script>

<style lang="scss">

</style>