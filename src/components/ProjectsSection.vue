<template>
  <section id="projects" class="projects-section">
    <div class="container">
      <h2 class="section-title">竞赛 &amp; 项目</h2>
      <p class="section-subtitle">实践中的探索与创造</p>
      <div class="projects-grid">
        <div
          v-for="i in 3"
          :key="i"
          class="project-card-ghost"
        >
          <div class="ghost-icon">🚀</div>
          <div class="ghost-title">项目 {{ i }}</div>
          <div class="ghost-line"></div>
          <div class="ghost-desc">期待精彩内容</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Projects placeholder
</script>

<style scoped>
.projects-section {
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.project-card-ghost {
  padding: 36px 24px;
  text-align: center;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1.5px dashed var(--border);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.project-card-ghost:hover {
  border-color: var(--accent-light);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.ghost-icon {
  font-size: 2rem;
  margin-bottom: 12px;
}

.ghost-title {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.ghost-line {
  width: 40px;
  height: 2px;
  background: var(--border-light);
  margin: 0 auto 12px;
}

.ghost-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
