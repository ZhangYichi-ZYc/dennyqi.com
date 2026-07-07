<template>
  <section class="hero">
    <div class="hero-content">
      <div class="hero-avatar">
        <div class="avatar-placeholder">DQ</div>
      </div>
      <h1 class="hero-name">DennyQi</h1>
      <p class="hero-tagline">
        在信息、数学与音乐的交界处探索
      </p>
      <div class="hero-tags">
        <span class="tag">信息学</span>
        <span class="tag">数学</span>
        <span class="tag">人工智能</span>
        <span class="tag">音乐</span>
        <span class="tag">语言</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Hero section
</script>

<style scoped>
.hero {
  padding: 72px 0 56px;
  text-align: center;
}

.hero-content {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 var(--page-padding);
}

.hero-avatar {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.avatar-placeholder {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-light), var(--accent));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-weight: 700;
  box-shadow: 0 4px 20px rgba(193, 125, 75, 0.2);
}

.hero-name {
  font-family: var(--font-serif);
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}

.hero-tagline {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 28px;
  line-height: 1.6;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.tag {
  display: inline-block;
  padding: 6px 18px;
  border-radius: 20px;
  background: var(--bg-warm);
  color: var(--accent-deep);
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid var(--border-light);
  transition: all 0.2s;
}

.tag:hover {
  background: var(--accent-light);
  border-color: var(--accent);
  color: var(--accent-deep);
}
</style>
