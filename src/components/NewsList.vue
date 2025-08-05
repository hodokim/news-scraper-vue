<script setup>
import { ref, onMounted, defineExpose } from 'vue';
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

defineExpose({
  fetchNews
});
</script>

<template>
  <div class="news-list-card">
    <div class="card-header">
      <h3>수집된 뉴스</h3>
      <button @click="fetchNews" :disabled="isLoading" class="refresh-btn">
        <img src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/refresh-icon.svg" alt="새로고침" />
      </button>
    </div>

    <div class="info-text">
      <span>💡</span>
      <div class="message-group">
        <p>키워드를 추가하셨나요?</p>
        <p>우측에 새로고침 버튼을 눌러주세요.</p>
      </div>
    </div>

    <div v-if="isLoading" class="loading-message">뉴스를 불러오는 중입니다...</div>
    <div v-else-if="newsItems.length === 0" class="empty-message">수집된 뉴스가 없습니다. 키워드를 추가해보세요.</div>
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
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.card-header h3 {
  margin: 0;
}

.info-text {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #f8f9fa; /* 밝은 회색 배경 */
  border-radius: 6px; /* 둥근 모서리 */
  padding: 0.75rem 1rem; /* 안쪽 여백 */
  margin-bottom: 1.5rem; /* 아래쪽 여백 */
}
.info-text span {
  font-size: 1.2rem; /* 아이콘 크기 */
}
.message-group p {
  margin: 0;
  font-size: 0.8rem;
  color: #495057;
  line-height: 1.4;
}

.refresh-btn {
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}
.refresh-btn:hover:not(:disabled) {
  background-color: #f0f0f0;
}
.refresh-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.refresh-btn img {
  width: 20px; /* 아이콘 크기 조절 */
  height: 20px;
}

ul { list-style: none; padding: 0; }
.news-item {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}
.news-item:last-child {
  border-bottom: none;
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
  margin: 0.5rem 0;
}
.meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 0.5rem;
}
.loading-message, .empty-message {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}
</style>