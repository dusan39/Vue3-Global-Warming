import { ref, computed } from "vue";

export function averageCalculator(total, counter){

  const average = ref(0);

  const calculateAverage = computed(() => {
    return total / counter
  });

  average.value = parseFloat(calculateAverage.value.toFixed(2))
  
  return{ average }
}