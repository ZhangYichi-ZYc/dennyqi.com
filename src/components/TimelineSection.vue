<template>
  <section id="experience" class="timeline-section">
    <div class="container">
      <h2 class="section-title">个人经历</h2>
      <p class="section-subtitle">成长路上的每一步</p>
      <div class="timeline-placeholder">
        <div class="timeline-line"></div>
        <div class="placeholder-content">
          <span class="placeholder-icon">🌱</span>
          <p class="placeholder-text">整理中，敬请期待</p>
          <p class="placeholder-hint">这里将记录我的学习与成长历程</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Timeline placeholder
</script>

<style scoped>
.timeline-section {
  padding: 64px 0;
  background: var(--bg-warm);
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

.timeline-placeholder {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  padding: 32px 0 32px 48px;
}

.timeline-line {
  position: absolute;
  left: 22px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    var(--accent-light) 0,
    var(--accent-light) 6px,
    transparent 6px,
    transparent 14px
  );
}

.placeholder-content {
  text-align: center;
  padding: 40px 32px;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
}

.placeholder-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 12px;
}

.placeholder-text {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.placeholder-hint {
  font-size: 0.85rem;
  color: var(--text-muted);
}
</style>
