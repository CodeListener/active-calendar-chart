<script setup lang="ts">
import { ActiveCalendarChart } from "../../lib/index";
import data from "./mock-data.json";
</script>

<template>
  <div class="container">
    <h1>Active-Calendar-Chart</h1>
    <h2>Default</h2>
    <ActiveCalendarChart :value="data" descripton="Description: Active-Calendar-Chart" :colors="['#ebedf0', '#87b5f1', '#1e80ff', '#005dd6']" />

    <br />

    <h2>Year (2022)</h2>
    <ActiveCalendarChart descripton="Year (2022)" :date="2022" :value="data" />

    <br />

    <h2>StartDate - EndDate (2022-04-01 ~ 2022-10-01)</h2>
    <ActiveCalendarChart
      descripton="Description: Active-Calendar-Chart"
      :colors="['#ebedf0', '#87b5f1', '#1e80ff', '#005dd6']"
      :date="{ start: '2022-04-01', end: '2022-10-10' }"
      :value="data"
    />
  </div>
</template>

<style scoped>
h1 {
  padding: 8px 12px;
  background-color: #0058f9;
  color: #fff;
  border-radius: 12px;
  font-size: 18px;
}
h2 {
  font-size: 14px;
  color: #333;
}
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
