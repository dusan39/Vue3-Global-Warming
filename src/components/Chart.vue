<template>

  <div class="chart__container">
    <canvas ref="canvasRef"></canvas>
  </div>
  
</template>

<script setup>

import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

  const props = defineProps({
    labels: {
      type: Array,
      required: true,
    },
    datasets: {
      type: Object,
      required: true,
    },
    type:{
      type: String,
      required: true
    },
    animation:{
      type: Boolean,
      required: true
    }
  });

  const canvasRef = ref(null);
  const chart = ref(null);

  const createChart = async () => {
    const ctx = canvasRef.value.getContext('2d');
    const config = {
      type: props.type,
      data: {
        labels: props.labels,
        datasets: props.datasets,
      },
      options: {
        animation: props.animation
      },
    };
    chart.value = new Chart(ctx, config);
  }

  onMounted(createChart);

</script>

<style lang="scss" scoped>

  .chart__container{
    max-width: 1000px;
    width: 100%;
    border-radius: 50px;
    padding: 30px; 
    background: rgba(255, 255, 255, .1);
    box-shadow: 0 25px 45px rgba(0, 0, 0, .2);
    border: 2px solid rgba(255, 255, 255, .5);
    backdrop-filter: blur(10px);
  }

  @media screen and (max-width: 910px) {
    .chart__container{
      border-radius: 25px;
      padding: 15px;
      margin: 15px;
    }
  }

  @media (max-width: 390px){
    .chart__container{
      border-radius: 20px;
      padding: 10px;
      margin: 10px;
    }
  }

</style>