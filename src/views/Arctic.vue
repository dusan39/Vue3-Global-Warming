<template>

  <Suspense>
    <template #default>
      <div>
        <h1>Arctic</h1>
        <Chart :labels="chartLabels" :data="chartData" :label="chartLabel" canvasId="arcticChart" />
      </div>   
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>

</template>

<script setup>

import { ref, onMounted } from 'vue';
import { allAPI } from '../API';
import Chart from '../components/Chart.vue';

let month
let year
let rank
let fullDate

let rankArray = [];
let dateArray = [];

const chartLabels = ref(dateArray);
const chartData = ref(rankArray);
const chartLabel = ref('Arctic char');

  async function loadArcticAPI(){

    const { arcticAPI } = await allAPI();

    arcticAPI.forEach(obj => {
      month = obj.month;
      year = obj.year;
      rank = obj.rank;

      rankArray.push(rank);
      const fullDate = createDate(month, year);
      dateArray.push(fullDate);
    });

    console.log('Date labels: ' , dateArray)
    console.log('Rank data: ' , rankArray)
  } 

  function createDate(month, year){
      fullDate = month + '/' + year
      dateArray.push(fullDate)
      return fullDate
  }

  onMounted(() => {
    console.log(chartLabels.value)
    console.log(chartData.value)
    console.log(chartLabel.value)
    loadArcticAPI();
  });

</script>

<style lang="scss">

</style>