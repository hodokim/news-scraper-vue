<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const newsItems = ref([]);
const isLoading = ref(true);

const fetchNews = async () => {
  isLoading.value = true;
  try {
    const response = await api.getNews();
    newsItems.value = response.data;
  } catch (error) {
    console.error('뉴스 로딩 실패:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchNews);
</script>

<template>
  <div class="news-list-card">
    <h3>수집된 뉴스</h3>
    <button @click="fetchNews" :disabled="isLoading">새로고침</button>
    <div v-if="isLoading">뉴스를 불러오는 중입니다...</div>
    <div v-else-if="newsItems.length === 0">수집된 뉴스가 없습니다. 키워드를 추가해보세요.</div>
    <ul v-else>
      <li v-for="item in newsItems" :key="item.id" class="news-item">
        <h4><a :href="item.link" target="_blank">{{ item.title }}</a></h4>
        <p>{{ item.summary }}</p>
        <div class="meta">
          <span>출처: {{ item.sourceSite }}</span>
          <span>수집일: {{ new Date(item.createdAt).toLocaleString() }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.news-list-card {
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
}
.news-list-card > button {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
ul { list-style: none; padding: 0; }
.news-item {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}
.news-item h4 a {
  text-decoration: none;
  color: #0056b3;
}
.news-item h4 a:hover {
  text-decoration: underline;
}
.news-item p {
  color: #495057;
  font-size: 0.9rem;
}
.meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 0.5rem;
}
</style>