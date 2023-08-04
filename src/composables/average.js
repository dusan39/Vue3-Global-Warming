import { computed, ref } from "vue";

export function averageCalculator(totalData, counterData){

  const average = ref(0)

  const calculateAverage = computed(() => {
    return totalData.value / counterData.value
  });

  average.value = calculateAverage.value

  return{
    average
  }
}