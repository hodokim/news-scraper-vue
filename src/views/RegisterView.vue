<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const username = ref('');
const password = ref('');
const email = ref('');

const handleRegister = () => {
  if (!username.value || !password.value || !email.value) {
    alert('모든 필드를 입력해주세요.');
    return;
  }
  authStore.register({
    username: username.value,
    password: password.value,
    email: email.value
  });
};
</script>

<template>
  <div class="register-container">
    <h2>회원가입</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">아이디</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <button type="submit">회원가입</button>
    </form>
    <p>
      이미 계정이 있으신가요? <RouterLink to="/login">로그인</RouterLink>
    </p>
  </div>
</template>

<style scoped>
/* 로그인 뷰와 동일한 스타일 사용 */
.register-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
h2 { text-align: center; margin-bottom: 1.5rem; }
.form-group { margin-bottom: 1rem; }
label { display: block; margin-bottom: 0.5rem; }
input { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
button { width: 100%; padding: 0.75rem; border: none; border-radius: 4px; background-color: #28a745; color: white; font-size: 1rem; cursor: pointer; }
button:hover { background-color: #218838; }
p { margin-top: 1rem; text-align: center; }
</style>