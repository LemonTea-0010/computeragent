<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  nodes: Array<{ name: string; value: number; category: string }>
  links: Array<{ source: string; target: string; value: number }>
}>()

const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null

const renderChart = () => {
  if (!chartRef.value) return
  if (!chart) chart = echarts.init(chartRef.value)
  chart.setOption({
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'graph',
        layout: 'force',
        roam: true,
        force: { repulsion: 120, edgeLength: 90 },
        data: props.nodes.map((item) => ({
          ...item,
          symbolSize: Math.max(24, item.value / 2),
          itemStyle: {
            color: item.category === '微博' ? '#409EFF' : item.category === '新闻' ? '#67C23A' : '#E6A23C',
          },
        })),
        links: props.links.map((item) => ({
          ...item,
          lineStyle: { color: 'rgba(0,240,255,0.4)', width: Math.max(1, item.value / 120) },
        })),
        label: { show: true, color: '#eaf3ff' },
      },
    ],
  })
}

onMounted(renderChart)
watch(() => [props.nodes, props.links], renderChart, { deep: true })
onBeforeUnmount(() => chart?.dispose())
</script>

<template>
  <div ref="chartRef" class="chart"></div>
</template>

<style scoped lang="scss">
.chart {
  height: 360px;
}
</style>
