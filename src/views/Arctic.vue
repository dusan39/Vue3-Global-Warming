<template>

    <div class="arctic__container">
      <Navbar></Navbar>

      <div class="title__container">
        <h1>{{ $t('arctic') }}</h1>
      </div>

      <Chart v-if="dataLoaded" :labels="chartLabels" :datasets="chartDatasets" canvasId="arcticChart" :type="chartType" :animation="chartAnimation" />
    </div>   

</template>

<script setup>

import { ref, onMounted } from 'vue';
import { arcticData } from '../API';
import Navbar from '../components/Navbar.vue'
import Chart from '../components/Chart.vue';

  const areaData = ref([]);
  const extentData = ref([]);
  const rankData = ref([]);

  const chartDatasets = ref([]);
  const chartLabels = ref([]);

  const chartType = ref();
  const chartAnimation = ref();
  
  let dataLoaded = ref(false);

  async function loadArcticAPI () {
    const { arcticAPI } = await arcticData();

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

    chartDatasets.value = datasets
    dataLoaded.value = true
  }

  onMounted(loadArcticAPI)

</script>

<style lang="scss">

  .title__container{
    display: flex;
    justify-content: center;
    padding-top: 1%;
  }

</style>