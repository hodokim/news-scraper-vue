<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const keywords = ref([]);
const newKeyword = ref('');

const fetchKeywords = async () => {
  try {
    const response = await api.getKeywords();
    keywords.value = response.data;
  } catch (error) {
    console.error('키워드 로딩 실패:', error);
  }
};

const handleAddKeyword = async () => {
  if (!newKeyword.value.trim()) return;
  try {
    await api.addKeyword(newKeyword.value.trim());
    newKeyword.value = '';
    fetchKeywords(); // 목록 새로고침
    alert('키워드가 추가되었으며, 뉴스 수집을 시작합니다.');
  } catch (error) {
    console.error('키워드 추가 실패:', error);
    alert('키워드 추가에 실패했습니다.');
  }
};

const handleDeleteKeyword = async (id) => {
  if (!confirm('정말 이 키워드를 삭제하시겠습니까?')) return;
  try {
    await api.deleteKeyword(id);
    fetchKeywords(); // 목록 새로고침
    alert('키워드가 삭제되었습니다.');
  } catch (error) {
    console.error('키워드 삭제 실패:', error);
    alert('키워드 삭제에 실패했습니다.');
  }
};

onMounted(fetchKeywords);
</script>

<template>
  <div class="manager-card">
    <h3>키워드 관리</h3>
    <form @submit.prevent="handleAddKeyword" class="keyword-form">
      <input type="text" v-model="newKeyword" placeholder="추가할 키워드 입력" />
      <button type="submit">추가</button>
    </form>
    <ul>
      <li v-for="keyword in keywords" :key="keyword.id">
        <span>{{ keyword.keyword }}</span>
        <button @click="handleDeleteKeyword(keyword.id)" class="delete-btn">X</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.manager-card {
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
}
.keyword-form {
  display: flex;
  margin-bottom: 1rem;
}
input {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
}
button {
  padding: 0.5rem 1rem;
  border: 1px solid #007bff;
  background-color: #007bff;
  color: white;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}
ul { list-style: none; padding: 0; }
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}
.delete-btn {
  background-color: transparent;
  color: red;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
</style>