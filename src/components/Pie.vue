<template>
  <div class="chart">
  <Pie :data="chartData" />
  </div>
</template>

<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'PieChart',
  components: { Pie },
  props: {
    chartData: {
        type: Object,
        required: true
      }
  }
}
</script>
<style scoped>
.chart {
  width: 400px;
  height: 400px
}
</style>
