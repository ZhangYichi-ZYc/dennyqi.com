<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <p class="copyright">&copy; {{ year }} DennyQi</p>
      <div class="beian-links">
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          class="beian-link"
        >
          浙ICP备2023036581号
        </a>
        <span class="beian-divider">&middot;</span>
        <a
          href="https://beian.mps.gov.cn/#/query/webSearch?code=33010802013290"
          target="_blank"
          rel="noopener noreferrer"
          class="beian-link"
        >
          浙公网安备 33010802013290号-1
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  margin-top: auto;
  padding: 40px 0 32px;
  border-top: 1px solid var(--border-light);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--page-padding);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.copyright {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-family: var(--font-serif);
}

.beian-links {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.beian-link {
  font-size: 0.75rem;
  color: var(--text-muted);
  transition: color 0.2s;
  white-space: nowrap;
}

.beian-link:hover {
  color: var(--text-secondary);
}

.beian-divider {
  color: var(--border);
  font-size: 0.75rem;
}
</style>
