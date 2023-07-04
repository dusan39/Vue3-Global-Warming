<template>
  <canvas :id="props.canvasId"></canvas>
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

</style>