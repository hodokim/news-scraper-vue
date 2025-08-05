<script setup>
import { ref } from 'vue';
import api from '@/services/api';

const availableSites = ['NAVER', 'DAUM']; // 시스템에서 지원하는 사이트 목록
const selectedSite = ref(availableSites[0]);

const handleAddPreference = async () => {
  try {
    await api.addPreference(selectedSite.value);
    alert(`${selectedSite.value} 사이트가 추가되었습니다.`);
  } catch (error) {
    console.error('선호 사이트 추가 실패:', error);
    alert('이미 추가되었거나 오류가 발생했습니다.');
  }
};

const handleDeletePreference = async (siteName) => {
  if (!confirm(`${siteName} 사이트를 정말 삭제하시겠습니까?`)) return;
  try {
    await api.deletePreference(siteName);
    alert(`${siteName} 사이트가 삭제되었습니다.`);
  } catch (error) {
    console.error('선호 사이트 삭제 실패:', error);
  }
};
</script>

<template>
  <div class="manager-card">
    <h3>스크랩 사이트 관리</h3>
    <div class="preference-form">
      <select v-model="selectedSite">
        <option v-for="site in availableSites" :key="site" :value="site">
          {{ site }}
        </option>
      </select>
      <button @click="handleAddPreference">추가</button>
    </div>
    <p class="info">현재 삭제는 직접 API 호출로 가능합니다.</p>
    <p class="info">현재는 추가/삭제 기능만 제공하며, 목록 표시는 구현되지 않았습니다.</p>
  </div>
</template>

<style scoped>
.manager-card {
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
}
.preference-form {
  display: flex;
  margin-bottom: 1rem;
}
select {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
}
button {
  padding: 0.5rem 1rem;
  border: 1px solid #28a745;
  background-color: #28a745;
  color: white;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}
.info {
  font-size: 0.8rem;
  color: #6c757d;
}
</style>