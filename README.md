# 프로젝트 명: 털랭 | teulang

> 간단 설명 : 냉장고에 남는 식재료 때문에 골치 아프신 분들을 위한 식재료 기반 레시피 공유/추천 서비스
> <br>
> <br>
> 타겟 층: 남는 식재료를 활용한 레시피가 필요한 사람, 자취 하는 사람들
> <br>
> <br>
> 기획 의도: 자취생이라면 경험했을 '냉장고 털어먹기'를 위해, 식재료를 기반으로 레시피를 추천하고, 공유하는 서비스, '털랭'을 기획했습니다. 기존의 사이트에선 요리명을 통해 특정 레시피를 찾지만, 저희 서비스에선 재료명을 검색하여 여러 레시피를 확인할 수 있다는 것이 주요 특징입니다. 식재료를 검색할 때 키워드와 이미지로 검색할 수 있고, 사용자가 직접 레시피를 등록하는 것 또한 가능합니다. 사용자가 요리를 하면서 레시피 확인, 그리고 이미지 검색을 하는 데에 있어서 용이하도록 털랭 서비스는 모바일 환경을 지원합니다.

## 베포 주소

[털랭](https://teulang.net/)

## 개발 인원

김현우 [github](https://github.com/Duboo31)<br>
우은진 [github](https://github.com/EunjinWoo)

## 개발 환경

- Node.js v18.17.1
- npm 9.6.7

````json
"@fortawesome/fontawesome-svg-core": "^6.4.2",
"@fortawesome/free-brands-svg-icons": "^6.4.2",
"@fortawesome/free-regular-svg-icons": "^6.4.2",
"@fortawesome/free-solid-svg-icons": "^6.4.2",
"@fortawesome/react-fontawesome": "^0.2.0",
"@reduxjs/toolkit": "^1.9.7",
"@testing-library/jest-dom": "^5.14.1",
"@testing-library/react": "^13.0.0",
"@testing-library/user-event": "^13.2.1",
"axios": "^1.6.0",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-hook-form": "^7.48.2",
"react-hook-use-form": "^1.2.0",
"react-query": "^3.39.3",
"react-redux": "^8.1.3",
"react-router-dom": "^6.18.0",
"react-scripts": "5.0.1",
"redux-persist": "^6.0.0",
"swiper": "^11.0.3",
"web-vitals": "^2.1.0"```
````

## 시작 가이드

```
$ git clone https://github.com/Duboo31/final_project_teulang_client.git
```

**Frontend**

```
$ cd final_project_teulang_client
$ npm i
$ npm run start
```

## 화면 구성

### 메인
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-12-47](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/7ed2c1da-b070-43f9-b244-9495cb1ea300)|![스크린샷 2023-12-07 04-14-53](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/0921a60c-b9b1-497f-a205-d66635a4d7ce)|

### 모바일 네비게이션
|Mobile 📱|
|-|
|![스크린샷 2023-12-07 04-15-16](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/77e8b5c1-f384-4fc6-a6df-b9eee18e2207)|


### 전체 레시피
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-12-58](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/d54f3461-c6e8-4970-9ba3-099b0a4cf4f2)|![스크린샷 2023-12-07 04-15-13](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/12443631-aff5-4de0-a370-5f85a91f83be)|


### 자유 게시판
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-13-02](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/1f3e4d1f-b9a6-4e6c-862d-33550e186390)|![스크린샷 2023-12-07 04-15-22](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/ef3b942d-227d-4a20-8a20-66b390c7f9ac)|


### 레시피 작성
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-13-16](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/ef4b0067-75ed-42f8-bd3f-504f6d9b0003)|![스크린샷 2023-12-07 04-15-32](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/ff0250a1-1cd1-4428-a4ee-6b968784264d)|


### 게시글 작성
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-13-22](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/302c90fa-70c1-43ef-8c90-8437edb4e0bb)|![스크린샷 2023-12-07 04-15-37](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/21c376c0-7ff5-4b16-9f76-316093173887)|

### 마이 페이지 (내 레시피)
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-13-36](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/57faffd4-ca02-453f-9bba-265e2fd7ce4d)|![스크린샷 2023-12-07 04-32-24](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/3ee13e2d-c342-4fe9-9279-9b0bc296c1f9)|

### 마이 페이지 (북마크 레시피)
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-13-39](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/b5c6afc7-e981-49fa-9b7c-0f3a317118fe)|![스크린샷 2023-12-07 04-34-33](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/ced9eeba-c671-40d7-9196-f9b68e0cbe64)|

### 마이 페이지 (내 냉장고)
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-14-00](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/33be07f6-1226-46de-adf1-59387a58cf30)|![스크린샷 2023-12-07 04-34-35](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/4c81721c-2cf1-418e-ac4c-2b4389bc9bcf)|

### 마이페이지 (프로필 수정)
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-14-19](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/537e4f37-4888-45c6-bb52-73d2f1d91d88)|![스크린샷 2023-12-07 04-38-08](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/1ad467f6-1b59-4ba6-abf4-9442790c8a44)|

### 마이페이지 (회원 탈퇴)
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-14-24](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/3c638355-5f3c-4256-ab0f-2709dc3eebc6)|![스크린샷 2023-12-07 04-38-12](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/94a66fef-2739-468e-819a-18ae298abbb6)|

### 이미지 검색 
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-19-06](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/92d07d55-d76f-4191-9c45-b28a0c1c88a5)|![스크린샷 2023-12-07 04-18-38](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/3e7028c3-2f40-4fe0-9508-eff58db9e467)|

### 이미지 검색 
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-40-55](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/b3d27b32-19c9-4359-b064-d2fc8d26318c)|![스크린샷 2023-12-07 04-40-36](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/7eb95ebb-5890-47a4-9afe-ec9375ad33a9)|
