<template>
  <header class="app-header">
    <div class="header-inner">
      <router-link to="/" class="brand">DennyQi</router-link>
      <nav class="nav-links">
        <router-link to="/" class="nav-link" exact-active-class="active">
          <span class="nav-icon">🏠</span>
          <span class="nav-label">首页</span>
        </router-link>
        <a href="/#notes" class="nav-link">
          <span class="nav-icon">📝</span>
          <span class="nav-label">笔记</span>
        </a>
        <a href="/#experience" class="nav-link">
          <span class="nav-icon">🌱</span>
          <span class="nav-label">经历</span>
        </a>
        <a href="/#projects" class="nav-link">
          <span class="nav-icon">🚀</span>
          <span class="nav-label">项目</span>
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// Navigation header
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-height);
  background: rgba(254, 252, 246, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-light);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--page-padding);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  transition: color 0.2s;
}

.brand:hover {
  color: var(--accent);
}

.nav-links {
  display: flex;
  gap: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  color: var(--text-secondary);
  transition: all 0.2s;
  cursor: pointer;
}

.nav-link:hover {
  color: var(--accent);
  background: var(--bg-warm);
}

.nav-link.active,
.nav-link.router-link-exact-active {
  color: var(--accent-deep);
  background: var(--bg-warm);
}

.nav-icon {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .nav-label {
    display: none;
  }

  .nav-link {
    padding: 8px 10px;
  }

  .nav-icon {
    font-size: 1.2rem;
  }
}
</style>
