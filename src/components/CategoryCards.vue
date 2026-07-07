<template>
  <section id="notes" class="category-section">
    <div class="container">
      <h2 class="section-title">学习笔记</h2>
      <p class="section-subtitle">在不同领域的探索与记录</p>
      <div class="cards-grid">
        <CategoryCard
          v-for="cat in categories"
          :key="cat.id"
          :category="cat"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CategoryCard from './CategoryCard.vue'

const categories = [
  {
    id: 'physics',
    name: '物理',
    icon: '⚛️',
    description: '量子力学与经典物理',
    count: 0,
    path: '02 Physics',
  },
  {
    id: 'math',
    name: '数学',
    icon: '📐',
    description: '抽象代数、分析、概率论、范畴论',
    count: 0,
    path: '03 Mathematics',
  },
  {
    id: 'informatics',
    name: '信息学',
    icon: '💻',
    description: '信息论、计算理论、PLT、计算机系统、算法',
    count: 0,
    path: '04 Informatics',
  },
  {
    id: 'ai',
    name: '人工智能',
    icon: '🤖',
    description: '机器学习、深度学习、强化学习、大模型',
    count: 0,
    path: '05 Artificial Intelligence',
  },
  {
    id: 'languages',
    name: '语言',
    icon: '🗣️',
    description: 'Deutsch · 日本語 · 粤语 · English',
    count: 0,
    path: '07 Languages',
  },
  {
    id: 'readings',
    name: '阅读',
    icon: '📚',
    description: '书摘、古文、诗歌、基督教',
    count: 0,
    path: '08 Readings',
  },
  {
    id: 'music',
    name: '音乐',
    icon: '🎵',
    description: '和声学、作曲、演奏、音乐史',
    count: 0,
    path: '09 Music',
  },
]
</script>

<style scoped>
.category-section {
  padding: 64px 0;
}

.section-title {
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 8px;
}

.section-subtitle {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 36px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
