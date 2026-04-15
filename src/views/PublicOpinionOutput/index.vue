<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { publicOpinionOutputPackages, type OutputFormat, type OutputTone } from '@/mock/publicOpinionOutput'

const router = useRouter()
const keyword = ref('美伊冲突')
const selectedTone = ref<'全部' | OutputTone>('全部')
const selectedFormat = ref<'全部' | OutputFormat>('全部')

const toneOptions: Array<'全部' | OutputTone> = ['全部', '正向', '中性', '负向']
const formatOptions: Array<'全部' | OutputFormat> = ['全部', '短帖', '长文导语', '问答口径', '短视频脚本', '标题方案', '图文卡片']

const matchedPackage = computed(() =>
  publicOpinionOutputPackages.find((item) => [item.keyword, ...item.aliases].some((alias) => keyword.value.trim().includes(alias) || alias.includes(keyword.value.trim()))),
)

const quickPreview = computed(() => matchedPackage.value?.items.slice(0, 6) ?? [])

const handleSearch = () => {
  if (!matchedPackage.value) return
  router.push({
    path: '/public-opinion-output/result',
    query: {
      keyword: matchedPackage.value.keyword,
      tone: selectedTone.value,
      format: selectedFormat.value,
    },
  })
}
</script>

<template>
  <div class="page-container output-search-page">
    <section class="hero tech-card">
      <div class="hero-badge">舆情产出沙盘</div>
      <h2 class="hero-title">多倾向内容样本搜索</h2>
      <p class="hero-desc">
        输入事件关键词，筛选正向 / 中性 / 负向内容倾向与素材形式，进入专题化样本页面。当前前端演示仅支持“美伊冲突”。
      </p>
      <div class="notice-box">{{ matchedPackage?.notice ?? '以下内容均为虚构演示样本，仅用于比赛前端功能展示。' }}</div>

      <div class="search-shell">
        <el-input v-model="keyword" class="keyword-input" size="large" placeholder="请输入关键词，例如：美伊冲突" @keyup.enter="handleSearch" />
        <div class="filter-row">
          <div class="filter-group">
            <div class="filter-label">内容倾向</div>
            <div class="chip-row">
              <button
                v-for="item in toneOptions"
                :key="item"
                type="button"
                class="tone-chip"
                :class="{ active: selectedTone === item }"
                @click="selectedTone = item"
              >
                {{ item }}
              </button>
            </div>
          </div>
          <div class="filter-group">
            <div class="filter-label">内容形式</div>
            <div class="chip-row">
              <button
                v-for="item in formatOptions"
                :key="item"
                type="button"
                class="tone-chip"
                :class="{ active: selectedFormat === item }"
                @click="selectedFormat = item"
              >
                {{ item }}
              </button>
            </div>
          </div>
        </div>
        <div class="action-row">
          <el-button type="primary" size="large" @click="handleSearch">进入样本产出页</el-button>
          <span v-if="!matchedPackage" class="search-tip">当前仅支持关键词：美伊冲突</span>
        </div>
      </div>
    </section>

    <section class="panel-grid-3 preview-grid">
      <div class="tech-card info-card">
        <div class="section-title">当前支持专题</div>
        <div class="topic-name">{{ matchedPackage?.keyword ?? '美伊冲突' }}</div>
        <p class="muted-text">{{ matchedPackage?.summary ?? '当前为前端演示专题' }}</p>
      </div>
      <div class="tech-card info-card">
        <div class="section-title">可选倾向</div>
        <div class="badge-row">
          <span v-for="item in toneOptions.slice(1)" :key="item" class="flat-badge">{{ item }}</span>
        </div>
      </div>
      <div class="tech-card info-card">
        <div class="section-title">可选形式</div>
        <div class="badge-row">
          <span v-for="item in formatOptions.slice(1)" :key="item" class="flat-badge">{{ item }}</span>
        </div>
      </div>
    </section>

    <section class="tech-card preview-panel">
      <div class="preview-head">
        <div>
          <div class="section-title">样本预览</div>
          <div class="section-sub">搜索后将跳转到完整样本页面，这里只展示部分示例。</div>
        </div>
      </div>
      <div class="preview-list">
        <article v-for="item in quickPreview" :key="item.id" class="preview-item">
          <div class="preview-meta">
            <span class="meta-badge tone">{{ item.tone }}</span>
            <span class="meta-badge alt">{{ item.format }}</span>
            <span class="meta-badge plain">{{ item.sampleType }}</span>
          </div>
          <div class="preview-title">{{ item.title }}</div>
          <p class="preview-content">{{ item.content }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.output-search-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero {
  padding: 30px;
  background:
    radial-gradient(circle at 12% 18%, rgba(255, 143, 31, 0.2), transparent 30%),
    radial-gradient(circle at 82% 16%, rgba(0, 240, 255, 0.12), transparent 32%),
    linear-gradient(145deg, rgba(13, 18, 31, 0.98), rgba(8, 14, 28, 0.98));
}

.hero-badge,
.flat-badge,
.meta-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
}

.hero-badge {
  padding: 6px 14px;
  margin-bottom: 14px;
  color: #ffb347;
  border: 1px solid rgba(255, 179, 71, 0.28);
  letter-spacing: 0.12em;
  font-size: 12px;
}

.hero-title {
  margin: 0 0 10px;
  font-size: 34px;
  color: #f3f8ff;
}

.hero-desc,
.preview-content {
  color: #b9cae8;
  line-height: 1.8;
}

.notice-box {
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 179, 71, 0.2);
  background: rgba(255, 179, 71, 0.06);
  color: #ffe0ad;
}

.search-shell {
  margin-top: 22px;
}

.keyword-input {
  margin-bottom: 16px;
}

.filter-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.filter-group,
.info-card,
.preview-panel {
  padding: 18px;
}

.filter-label,
.preview-title,
.topic-name {
  color: #eef5ff;
  font-weight: 700;
}

.chip-row,
.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tone-chip {
  border: 1px solid rgba(64, 158, 255, 0.22);
  background: rgba(255, 255, 255, 0.03);
  color: #a8badd;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: 0.2s ease;
}

.tone-chip.active,
.tone-chip:hover {
  color: #00f0ff;
  border-color: rgba(0, 240, 255, 0.35);
  background: rgba(0, 240, 255, 0.08);
}

.action-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 18px;
}

.search-tip,
.section-sub {
  color: #7f97c7;
}

.flat-badge,
.meta-badge {
  padding: 6px 12px;
  font-size: 12px;
  border: 1px solid rgba(64, 158, 255, 0.2);
  background: rgba(255, 255, 255, 0.03);
  color: #9fb3d8;
}

.meta-badge.tone {
  color: #00f0ff;
}

.meta-badge.alt {
  color: #ffb347;
  border-color: rgba(255, 179, 71, 0.2);
}

.meta-badge.plain {
  color: #d4dceb;
}

.preview-grid {
  align-items: stretch;
}

.topic-name {
  font-size: 22px;
  margin-bottom: 10px;
}

.preview-head {
  margin-bottom: 14px;
}

.preview-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.preview-item {
  padding: 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(64, 158, 255, 0.14);
}

.preview-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.preview-title {
  margin-bottom: 10px;
}

@media (max-width: 1200px) {
  .filter-row,
  .preview-list {
    grid-template-columns: 1fr;
  }
}
</style>
