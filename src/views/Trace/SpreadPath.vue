<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import NetworkGraph from '@/components/Charts/NetworkGraph.vue'
import { getSpreadPath } from '@/api/trace'

const props = defineProps<{
  eventName?: string
}>()

const isGeneric = computed(() => !props.eventName || props.eventName !== '美伊冲突')

interface SpreadPathData {
  nodes: Array<{ name: string; value: number; category: string }>
  links: Array<{ source: string; target: string; value: number }>
}

const LOCAL_MOCK_DATA: SpreadPathData = {
  nodes: [
    { name: '微博话题', value: 100, category: '平台' },
    { name: '行业KOL', value: 85, category: '用户' },
    { name: '主流媒体', value: 72, category: '媒体' },
    { name: '普通转发者', value: 50, category: '用户' },
    { name: '自媒体矩阵', value: 65, category: '用户' },
  ],
  links: [
    { source: '微博话题', target: '行业KOL', value: 45 },
    { source: '行业KOL', target: '主流媒体', value: 60 },
    { source: '主流媒体', target: '普通转发者', value: 38 },
    { source: '微博话题', target: '自媒体矩阵', value: 55 },
  ]
}

const data = ref<SpreadPathData | null>(null)

const fetchData = async () => {
  if (isGeneric.value) {
    data.value = LOCAL_MOCK_DATA
    return
  }
  try {
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
    const resp = await Promise.race([getSpreadPath(), timeoutPromise])
    // ... rest of logic
  } catch (e) {
    data.value = LOCAL_MOCK_DATA
  }
}

onMounted(fetchData)
</script>

<template>
  <div class="page-container">
    <h2 class="page-title">传播路径图</h2>
    <div v-if="data" class="tech-card content">
      <div class="section-title">网络拓扑传播关系</div>
      <NetworkGraph :nodes="data.nodes" :links="data.links" />
      <div class="tips">节点大小表示影响力，连线粗细表示传播强度。</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  padding: 20px;
}

.section-title {
  margin-bottom: 8px;
  color: #00f0ff;
  font-weight: 700;
}

.tips {
  margin-top: 10px;
  color: #7f97c7;
  font-size: 12px;
}
</style>
