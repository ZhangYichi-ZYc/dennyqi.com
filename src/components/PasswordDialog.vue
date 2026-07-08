<template>
  <div class="pw-overlay">
    <div class="pw-card">
      <button class="pw-close" @click="$emit('close')" title="关闭">✕</button>
      <h2 class="pw-title">需要密码</h2>
      <p class="pw-hint">此笔记需要验证密码才能访问</p>
      <form class="pw-form" @submit.prevent="submit">
        <input
          ref="inputRef"
          v-model="password"
          type="password"
          class="pw-input"
          placeholder="请输入密码"
          autocomplete="off"
        />
        <p v-if="errorMsg" class="pw-error">{{ errorMsg }}</p>
        <button type="submit" class="pw-btn" :disabled="loading">
          {{ loading ? '验证中...' : '确认' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  authenticated: [token: string]
  close: []
}>()

const password = ref('')
const loading = ref(false)
const errorMsg = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  inputRef.value?.focus()
  document.addEventListener('keydown', onKeydown)
})
onUnmounted(() => document.removeEventListener('keydown', onKeydown))

async function submit() {
  if (!password.value.trim()) return
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value }),
    })
    if (!res.ok) {
      errorMsg.value = '密码错误，请重试'
      password.value = ''
      inputRef.value?.focus()
      return
    }
    const data = await res.json()
    emit('authenticated', data.token)
  } catch {
    errorMsg.value = '网络错误，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.pw-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(61, 50, 38, 0.25);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.pw-card {
  position: relative;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-lg);
  padding: 40px 36px;
  width: 360px;
  max-width: 90vw;
  text-align: center;
}

.pw-title {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.pw-hint {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 24px;
}

.pw-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pw-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 1rem;
  color: var(--text-primary);
  background: var(--bg-warm);
  outline: none;
  transition: border-color 0.2s;
  text-align: center;
}

.pw-input:focus {
  border-color: var(--accent);
}

.pw-error {
  font-size: 0.8rem;
  color: #c44;
  min-height: 1.2em;
}

.pw-btn {
  width: 100%;
  padding: 11px 0;
  border: none;
  border-radius: var(--radius-md);
  background: var(--accent);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.pw-btn:hover {
  background: var(--accent-deep);
}

.pw-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.pw-close {
  position: absolute;
  top: 12px;
  right: 14px;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: var(--text-muted);
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s, background 0.2s;
}

.pw-close:hover {
  color: var(--text-primary);
  background: var(--bg-warm);
}
</style>
