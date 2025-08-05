<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

// 상태 변수
const preferredSites = ref([]);
const availableSites = ['NAVER', 'DAUM']; // 시스템에서 지원하는 사이트 목록
const selectedSite = ref(availableSites[0]); // 드롭다운 기본 선택 값

/**
 * 나의 선호 사이트 목록을 서버에서 가져와 화면에 반영합니다.
 */
const fetchMySites = async () => {
  try {
    const response = await api.getMyInfo();
    preferredSites.value = response.data.preferredSites || [];
  } catch (error) {
    console.error('선호 사이트 목록 로딩 실패:', error);
    alert('선호 사이트 목록을 불러오는 중 오류가 발생했습니다.');
  }
};

/**
 * '추가' 버튼 클릭 시, 선택된 사이트를 선호 목록에 추가합니다.
 */
const handleAddPreference = async () => {
  try {
    // 이미 목록에 있는지 확인
    if (preferredSites.value.includes(selectedSite.value)) {
      alert('이미 추가된 사이트입니다.');
      return;
    }
    await api.addPreference(selectedSite.value);
    alert(`'${selectedSite.value}' 사이트가 추가되었습니다.`);
    fetchMySites(); // 목록 새로고침
  } catch (error) {
    console.error('선호 사이트 추가 실패:', error);
    alert('선호 사이트 추가 중 오류가 발생했습니다.');
  }
};

/**
 * '삭제' 버튼 클릭 시, 해당 사이트를 선호 목록에서 제거합니다.
 */
const handleDeletePreference = async (siteName) => {
  if (!confirm(`'${siteName}' 사이트를 정말 삭제하시겠습니까?`)) return;
  try {
    await api.deletePreference(siteName);
    alert(`'${siteName}' 사이트가 삭제되었습니다.`);
    fetchMySites(); // 목록 새로고침
  } catch (error) {
    console.error('선호 사이트 삭제 실패:', error);
    alert('선호 사이트 삭제 중 오류가 발생했습니다.');
  }
};

// 컴포넌트가 마운트될 때, 선호 사이트 목록을 바로 불러옵니다.
onMounted(fetchMySites);
</script>

<template>
  <div class="manager-card">
    <h3>스크랩 사이트 관리</h3>
    <form @submit.prevent="handleAddPreference" class="preference-form">
      <select v-model="selectedSite">
        <option v-for="site in availableSites" :key="site" :value="site">
          {{ site }}
        </option>
      </select>
      <button type="submit">추가</button>
    </form>

    <ul>
      <li v-if="preferredSites.length === 0">
        <span>선호하는 사이트가 없습니다.</span>
      </li>
      <li v-for="site in preferredSites" :key="site">
        <span>{{ site }}</span>
        <button @click="handleDeletePreference(site)" class="delete-btn">삭제</button>
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
h3 {
  margin-top: 0;
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
  background-color: white;
}
button {
  padding: 0.5rem 1rem;
  border: 1px solid #28a745;
  background-color: #28a745;
  color: white;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.2s;
}
button:hover {
  background-color: #218838;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid #eee;
}
li:last-child {
  border-bottom: none;
}
.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.delete-btn:hover {
  background-color: #c82333;
}
</style>