<template>

  <canvas :id="canvasId"></canvas>

</template>

<script setup>

import { ref, defineProps } from 'vue';
import Chart from 'chart.js/auto';

const { props } = defineProps({
  canvasId: {
    type: String,
    required: true,
  },
});

const labels = ref([]);
const data = ref([]);
const label = ref('');

  function createChart() {
    const ctx = document.getElementById(props.canvasId);
    const config = {
      type: 'line',
      data: {
        labels: labels.value,
        datasets: [
          {
            label: label.value,
            backgroundColor: '#19A7CE',
            borderColor: '#19A7CE',
            data: data.value,
          },
        ],
      },
      options: {},
    };

    const chart = new Chart(ctx, config);
    console.log('Sono dentro createChart')
  }

  const loadData = async () => {
    return new Promise((resolve) => {
      setTimeout(() =>{
        resolve({
          createChart
        });
      }, 3000, console.log('Sono dentro loadData'));  
    });
  };
  
  const chartAwait = ref(await loadData())

</script>

<style lang="scss">

</style>