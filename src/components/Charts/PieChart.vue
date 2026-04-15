<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  data: Array<{ name: string; value: number }>
}>()

const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null

const renderChart = () => {
  const el = chartRef.value
  if (!el) return

  // 如果容器尚未有宽高，延迟一点再尝试渲染，避免 ECharts DOM 宽高为 0 报错
  if (el.clientWidth === 0 || el.clientHeight === 0) {
    setTimeout(renderChart, 50)
    return
  }

  if (!chart) chart = echarts.init(el)
  chart.setOption({
    tooltip: { trigger: 'item' },
    legend: {
      bottom: '0%',
      itemGap: 10,
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        color: '#b7c7e8',
        fontSize: 11,
      },
    },
    series: [
      {
        type: 'pie',
        center: ['50%', '45%'],
        radius: ['45%', '65%'],
        data: props.data,
        label: { color: '#eaf3ff' },
      },
    ],
  })
}

onMounted(renderChart)
watch(
  () => props.data,
  () => {
    renderChart()
  },
  { deep: true },
)
onBeforeUnmount(() => chart?.dispose())
</script>

<template>
  <div ref="chartRef" class="chart"></div>
</template>

<style scoped lang="scss">
.chart {
  height: 220px;
}
</style>
