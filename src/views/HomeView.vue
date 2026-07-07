<template>
  <div class="home">
    <AppHeader />
    <main>
      <HeroSection />
      <CategoryCards />
      <TimelineSection />
      <ProjectsSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import CategoryCards from '@/components/CategoryCards.vue'
import TimelineSection from '@/components/TimelineSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
