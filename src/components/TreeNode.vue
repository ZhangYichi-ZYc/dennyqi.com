<template>
  <div class="tree-node">
    <!-- Directory -->
    <div
      v-if="node.type === 'directory'"
      class="node-dir"
      :style="{ paddingLeft: depth * 16 + 8 + 'px' }"
    >
      <button class="node-toggle" @click="expanded = !expanded">
        <span class="toggle-icon" :class="{ expanded }">▸</span>
        <span class="node-name dir">{{ node.name }}</span>
      </button>
      <div v-if="expanded" class="node-children">
        <TreeNode
          v-for="child in node.children"
          :key="child.name"
          :node="child"
          :active-path="activePath"
          :depth="depth + 1"
          @select="$emit('select', $event)"
        />
      </div>
    </div>

    <!-- File -->
    <button
      v-else
      class="node-file"
      :class="{ active: activePath === node.path }"
      :style="{ paddingLeft: depth * 16 + 24 + 'px' }"
      @click="$emit('select', node.path!)"
    >
      <span class="node-name file">
        <span v-if="node.isProtected" class="lock-icon">🔒</span>
        {{ node.name }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { NoteNode } from '@/types'

defineProps<{
  node: NoteNode
  activePath?: string
  depth: number
}>()

defineEmits<{
  select: [path: string]
}>()

const expanded = ref(false)
</script>

<style scoped>
.node-dir {
  margin: 1px 0;
}

.node-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 6px 8px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 0.88rem;
  transition: background 0.15s;
}

.node-toggle:hover {
  background: var(--bg-warm);
}

.toggle-icon {
  font-size: 0.65rem;
  color: var(--text-muted);
  transition: transform 0.2s;
  flex-shrink: 0;
}

.toggle-icon.expanded {
  transform: rotate(90deg);
}

.node-name.dir {
  font-weight: 600;
  font-size: 0.88rem;
}

.node-file {
  display: block;
  width: 100%;
  padding: 5px 8px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 0.84rem;
  text-align: left;
  transition: all 0.15s;
  margin: 1px 0;
}

.node-file:hover {
  background: var(--bg-warm);
  color: var(--text-primary);
}

.node-file.active {
  color: var(--accent-deep);
  background: var(--bg-warm);
  font-weight: 500;
}

.lock-icon {
  font-size: 0.7rem;
  margin-right: 4px;
  opacity: 0.6;
}
</style>
