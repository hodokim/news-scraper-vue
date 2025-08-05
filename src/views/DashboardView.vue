<script setup>
import KeywordManager from '@/components/KeywordManager.vue';
import PreferenceManager from '@/components/PreferenceManager.vue';
import NewsList from '@/components/NewsList.vue';
</script>

<template>
  <div class="dashboard-grid">
    <div class="grid-item">
      <KeywordManager />
      <PreferenceManager />
    </div>
    <div class="grid-item news-list-container">
      <NewsList />
    </div>
  </div>
</template>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}
.grid-item {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.news-list-container {
  grid-column: 2 / 3;
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  .news-list-container {
    grid-column: 1 / 2;
  }
}
</style>