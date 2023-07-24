<template>

  <div class="chart__container">
    <canvas :id="props.canvasId"></canvas>
  </div>
  
</template>

<script setup>

import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

  const props = defineProps({
    canvasId: {
      type: String,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
    datasets: {
      type: Object,
      required: true,
    },
  });

  const chart = ref(null);

  function createChart () {
    const ctx = document.getElementById(props.canvasId);
    const config = {
      type: 'line',
      data: {
        labels: props.labels,
        datasets: props.datasets,
      },
      options: {},
    };
    chart.value = new Chart(ctx, config);
  }
  
  onMounted(() => {
    createChart()
  });

</script>

<style lang="scss">

  .chart__container{
    border-radius: 50px;
    padding: 30px;
    margin: 1% 8% 8% 8%;

    background: rgba(255, 255, 255, .1);
    box-shadow: 0 25px 45px rgba(0, 0, 0, .2);
    border: 2px solid rgba(255, 255, 255, .5);
    backdrop-filter: blur(10px);
  }

</style>