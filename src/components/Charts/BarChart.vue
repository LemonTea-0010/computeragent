<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { createCommonOption } from '@/utils/echarts'

const props = defineProps<{
  data: Array<{ name: string; value: number }>
}>()

const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null

const renderChart = () => {
  const el = chartRef.value
  if (!el) return

  if (el.clientWidth === 0 || el.clientHeight === 0) {
    setTimeout(renderChart, 50)
    return
  }

  if (!chart) chart = echarts.init(el)
  chart.setOption(
    createCommonOption({
      grid: {
        top: '15%',      // 顶部留出空间给 tooltip 或图例
        left: '2%',      // 极限压缩左侧空白
        right: '4%',     // 右侧留出一点余量防止标签被切
        bottom: '5%',    // 极限压缩底部空白
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: props.data.map((item) => item.name),
        axisLabel: { color: '#7f97c7', fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#7f97c7', fontSize: 11 },
        splitLine: { lineStyle: { color: 'rgba(64,158,255,0.1)' } },
      },
      series: [
        {
          type: 'bar',
          data: props.data.map((item) => item.value),
          barMaxWidth: 40, // 限制最大宽度
          barMinWidth: 15, // 限制最小宽度
          itemStyle: {
            color: '#409EFF',
            borderRadius: [4, 4, 0, 0], // 顶部圆角
          },
        },
      ],
    }),
  )
}

onMounted(() => {
  renderChart()
  window.addEventListener('resize', handleResize)
})

function handleResize() {
  if (chart) chart.resize()
}
watch(
  () => props.data,
  () => {
    renderChart()
  },
  { deep: true },
)
onBeforeUnmount(() => {
  chart?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="chart-wrapper">
    <div ref="chartRef" class="chart-dom"></div>
  </div>
</template>

<style scoped lang="scss">
.chart-wrapper {
  width: 100%;
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
}
.chart-dom {
  flex: 1;
  width: 100%;
  height: 100% !important;
}
</style>
