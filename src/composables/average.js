import { computed, ref } from "vue";

export function averageCalculator(totalArea, counterData){

  const average = ref(0)

  const calculateAverage = computed(() => {
    return totalArea.value / counterData.value
  });

  average.value = calculateAverage.value

  return{
    average
  }
}