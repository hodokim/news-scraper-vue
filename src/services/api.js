import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const apiClient = axios.create({
  baseURL: 'https://news-scraper-nilw.onrender.com', // Spring Boot 서버 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 모든 요청에 JWT 토큰을 추가
apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  // 사용자 관련 API
  register(user) {
    return apiClient.post('/users/register', user);
  },
  login(credentials) {
    return apiClient.post('/users/login', credentials);
  },
  // [추가된 함수] 현재 로그인된 사용자 정보 조회
  getMyInfo() {
    return apiClient.get('/users/me');
  },

  // 뉴스 및 키워드 관련 API
  getNews() {
    return apiClient.get('/news');
  },
  getKeywords() {
    return apiClient.get('/news/keywords');
  },
  addKeyword(keyword) {
    return apiClient.post('/news/keywords', { keyword });
  },
  deleteKeyword(id) {
    return apiClient.delete(`/news/keywords/${id}`);
  },

  // 선호 사이트 관련 API
  addPreference(siteName) {
    return apiClient.post('/users/preferences/sites', { siteName });
  },
  deletePreference(siteName) {
    return apiClient.delete(`/users/preferences/sites/${siteName}`);
  },
};