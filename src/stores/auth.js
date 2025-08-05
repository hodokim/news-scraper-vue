import { defineStore } from 'pinia';
import api from '@/services/api';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(credentials) {
      try {
        const response = await api.login(credentials);
        const token = response.data;
        this.token = token;
        this.username = credentials.username;
        localStorage.setItem('token', token);
        localStorage.setItem('username', credentials.username);
        router.push('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
        alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      }
    },
    async register(user) {
      try {
        await api.register(user);
        alert('회원가입이 완료되었습니다! 로그인해주세요.');
        router.push('/login');
      } catch (error) {
        console.error('Registration failed:', error);
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    },
    logout() {
      this.token = null;
      this.username = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      router.push('/login');
    },
  },
});