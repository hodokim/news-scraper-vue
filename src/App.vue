<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <header>
    <nav>
      <h1>뉴스 스크래퍼</h1>
      <div class="links">
        <template v-if="!authStore.isAuthenticated">
          <RouterLink to="/login">로그인</RouterLink>
          <RouterLink to="/register">회원가입</RouterLink>
        </template>
        <template v-else>
          <span>{{ authStore.username }}님, 환영합니다!</span>
          <a @click="authStore.logout()" href="#">로그아웃</a>
        </template>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav h1 {
  margin: 0;
  font-size: 1.5rem;
}
.links a {
  margin-left: 1rem;
  text-decoration: none;
  color: #007bff;
  cursor: pointer;
}
.links a:hover {
  text-decoration: underline;
}
.links span {
  margin-right: 1rem;
}
main {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>