<template>
  <div>
    <h1>Co2</h1>
  </div>
</template>

<script setup>

import { allAPI } from '../API';

let cycle
let trend
let day
let month
let year
let fullDate

const dateArray = [];
const cycleArray = [];
const trendArray = [];

  (async () => {

    const{ co2API } = await allAPI();

    co2API.forEach(obj => {
      day = obj.day
      month = obj.month
      year = obj.year

      cycle = obj.cycle
      trend = obj.trend

      cycleArray.push(cycle)
      trendArray.push(trend)

      createDate(day, month, year)
    })

    function createDate(day, month, year){
      fullDate = day + '/' + month + '/' + year
      dateArray.push(fullDate)
      return fullDate
    }

    console.log('Date labels ' , dateArray)
    console.log('Cycle data ' , cycleArray)
    console.log('Trend data ' , trendArray)

  })(); 



</script>

<style lang="scss" scoped>

</style>