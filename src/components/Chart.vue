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
    type:{
      type: String,
      required: true
    },
    animation:{
      type: Boolean,
      required: true
    }
  });

  const chart = ref(null);

  const createChart = async () => {
    const ctx = document.getElementById(props.canvasId);
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

<style lang="scss">

  .chart__container{
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
      margin: 3%;
    }
  }

  @media (max-width: 390px){
    .chart__container{
      border-radius: 20px;
      padding: 10px;
      margin: 2%;
    }
  }

</style>