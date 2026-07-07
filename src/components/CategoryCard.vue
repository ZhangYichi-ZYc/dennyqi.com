<template>
  <router-link
    :to="`/notes/${category.path}`"
    class="category-card"
  >
    <span class="card-icon">{{ category.icon }}</span>
    <div class="card-body">
      <h3 class="card-name">{{ category.name }}</h3>
      <p class="card-desc">{{ category.description }}</p>
    </div>
    <span class="card-count">{{ category.count }} 篇</span>
  </router-link>
</template>

<script setup lang="ts">
import type { CategoryMeta } from '@/types'

defineProps<{
  category: CategoryMeta
}>()
</script>

<style scoped>
.category-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--accent-light);
}

.card-icon {
  font-size: 2rem;
  line-height: 1;
  flex-shrink: 0;
}

.card-body {
  flex: 1;
  min-width: 0;
}

.card-name {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.card-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.card-count {
  flex-shrink: 0;
  font-size: 0.75rem;
  color: var(--text-muted);
  background: var(--bg-warm);
  padding: 3px 10px;
  border-radius: 12px;
  white-space: nowrap;
}
</style>
