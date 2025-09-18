# 🌐 뉴스 스크래퍼 (Vue.js Frontend)

이 프로젝트는 사용자가 관심 있는 **키워드**와 **뉴스 사이트**를 등록하면, 백엔드 서버가 해당 조건에 맞는 뉴스를 자동으로 스크랩하여 보여주는 웹 애플리케이션의 프론트엔드입니다.

Vue 3, Vite, Pinia를 사용하여 개발되었으며, 사용자 인증, 키워드 관리, 선호 사이트 설정, 스크랩된 뉴스 조회 기능을 제공합니다.

---

## ✨ 주요 기능

* **사용자 인증**:
    * 회원가입 및 로그인/로그아웃 기능을 제공합니다.
    * **Pinia**를 사용한 상태 관리를 통해 로그인 정보를 유지합니다.
    * **Vue Router**의 네비게이션 가드를 통해 인증이 필요한 페이지를 보호합니다.
* **키워드 관리**:
    * 뉴스 스크랩의 기준이 될 키워드를 추가하고 삭제할 수 있습니다.
    * 키워드를 추가하면 백엔드에서 즉시 해당 키워드로 뉴스 수집을 시작합니다.
* **스크랩 사이트 관리**:
    * 뉴스를 수집할 대상 사이트(Naver, Daum 등)를 사용자가 직접 선택하고 관리할 수 있습니다.
* **수집된 뉴스 조회**:
    * 사용자가 등록한 키워드와 사이트를 기반으로 수집된 최신 뉴스 목록을 보여줍니다.
    * 뉴스 제목, 요약, 출처, 수집 시간을 확인할 수 있으며 원문 링크로 이동이 가능합니다.

---

## 🛠️ 기술 스택

* **Framework**: Vue 3
* **Build Tool**: Vite
* **State Management**: Pinia
* **Routing**: Vue Router
* **HTTP Client**: Axios
* **Linting / Formatting**: ESLint, Prettier

---

##  API 통신

백엔드 서버와의 모든 통신은 `src/services/api.js`에 정의된 `axios` 인스턴스를 통해 이루어집니다.

* **Base URL**: `https://news-scraper-bsiv.onrender.com/api`
* **인증**: Axios 인터셉터를 사용하여 모든 API 요청 헤더에 JWT 토큰(`Bearer`)을 자동으로 추가합니다.

---

## 🚀 프로젝트 설정 및 실행

### 권장 IDE 설정

* [VSCode](https://code.visualstudio.com/) + [Volar (Vue Language Features)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### 프로젝트 설치

```sh
npm install
