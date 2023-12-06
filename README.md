
<p align="center"><img src="https://github.com/Duboo31/final_project_teulang_client/assets/92058864/06982266-0641-408d-9a80-bf157ebf9023" height="300px" width="300px"></p>


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

||김현우|우은진|
|-|-|-|
|GitHub|https://github.com/Duboo31|https://github.com/EunjinWoo|
|Blog|https://velog.io/@duboo|https://...|

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
> 인기 / 최신 레시피를 슬라이드로 볼 수 있는 페이지

### 모바일 네비게이션
|Mobile 📱|
|-|
|![스크린샷 2023-12-07 04-15-16](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/77e8b5c1-f384-4fc6-a6df-b9eee18e2207)|
> 모바일 화면을 고려한 네비게이션

### 회원가입
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-50-17](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/e8abaeca-ca56-4f3f-aa7a-c091ab38d3f4)|![스크린샷 2023-12-07 04-50-50](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/547024c7-62bf-4f0a-ac70-44793ae5ea2c)|
> 일반 회원가입 혹은 카카오 계정을 이용한 회원가입을 진행할 수 있는 페이지

### 로그인
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-50-20](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/1931beee-5ee6-48e9-8b3e-903bcdc6cf77)|![스크린샷 2023-12-07 04-50-50](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/42f8b712-fff6-4516-8694-70c5724ba1e3)|
> 일반 계정 로그인 혹은 카카오 계정을 이용한 로그인을 진행할 수 있는 페이지

### 비밀번호 재설정
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-50-25](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/525ca2b2-b2fd-4ad1-971e-504a9fdd18a5)|![스크린샷 2023-12-07 04-50-57](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/10b8c69a-e69e-425a-9f6e-60e73fc3c62b)|
> 비밀번호를 분실할 경우 가입한 이메일을 통한 인증 후 비밀번호를 재설정 할 수 있는 페이지

### 전체 레시피
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-12-58](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/d54f3461-c6e8-4970-9ba3-099b0a4cf4f2)|![스크린샷 2023-12-07 04-15-13](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/12443631-aff5-4de0-a370-5f85a91f83be)|
> 털랭의 모든 레시피를 인기 / 최신 정렬 및 페이지네이션을 사용해 20개씩 볼 수 있는 페이지

### 자유 게시판
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-13-02](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/1f3e4d1f-b9a6-4e6c-862d-33550e186390)|![스크린샷 2023-12-07 04-15-22](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/ef3b942d-227d-4a20-8a20-66b390c7f9ac)|
> 털랭의 자유 게시판 / 레시피 리뷰에 대한 게시글을 페이지네이션을 사용해 20개씩 볼 수 있는 페이지

### 레시피 작성
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-13-16](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/ef4b0067-75ed-42f8-bd3f-504f6d9b0003)|![스크린샷 2023-12-07 04-15-32](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/ff0250a1-1cd1-4428-a4ee-6b968784264d)|
> 조리 방법을 추가하여 레시피를 이미지, 재료, 설명 등.. 작성할 수 있는 페이지 

### 게시글 작성
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-13-22](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/302c90fa-70c1-43ef-8c90-8437edb4e0bb)|![스크린샷 2023-12-07 04-15-37](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/21c376c0-7ff5-4b16-9f76-316093173887)|
> 자유 / 리뷰를 선택해 이미지, 내용 게시물을 작성할 수 있는 페이지

### 마이 페이지 (내 레시피)
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-13-36](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/57faffd4-ca02-453f-9bba-265e2fd7ce4d)|![스크린샷 2023-12-07 04-32-24](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/3ee13e2d-c342-4fe9-9279-9b0bc296c1f9)|
> 내가 작성한 레시피와 편집 그리고 팔로우/팔로잉을 확인할 수 있는 페이지

### 마이 페이지 (북마크 레시피)
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-13-39](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/b5c6afc7-e981-49fa-9b7c-0f3a317118fe)|![스크린샷 2023-12-07 04-34-33](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/ced9eeba-c671-40d7-9196-f9b68e0cbe64)|
> 내가 북마크한 레시피를 확인할 수 있는 페이지

### 마이 페이지 (내 냉장고)
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-14-00](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/33be07f6-1226-46de-adf1-59387a58cf30)|![스크린샷 2023-12-07 04-34-35](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/4c81721c-2cf1-418e-ac4c-2b4389bc9bcf)|
> 내가 직접 입력한 내 냉장고 재료들을 확인하고 소비기한이 다가오는 재료를 사용한 레피시를 추천 받을 수 있는 레시피

### 마이페이지 (프로필 수정)
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-14-19](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/537e4f37-4888-45c6-bb52-73d2f1d91d88)|![스크린샷 2023-12-07 04-38-08](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/1ad467f6-1b59-4ba6-abf4-9442790c8a44)|
> 프로필 이미지, 닉네임, 비밀번호 등 수정이 가능한 페이지

### 마이페이지 (회원 탈퇴)
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-14-24](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/3c638355-5f3c-4256-ab0f-2709dc3eebc6)|![스크린샷 2023-12-07 04-38-12](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/94a66fef-2739-468e-819a-18ae298abbb6)|
> 회원 탈퇴에 대한 내용 확인 및 탈퇴를 할 수 있는 페이지

### 이미지 검색 
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-19-06](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/92d07d55-d76f-4191-9c45-b28a0c1c88a5)|![스크린샷 2023-12-07 04-18-38](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/3e7028c3-2f40-4fe0-9508-eff58db9e467)|
> ,를 통해 여러 재료를 입력해 레시피를 검색할 수 있는 기능

### 이미지 검색 
|Destop 🖥️|Mobile 📱|
|-|-|
|![스크린샷 2023-12-07 04-40-55](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/b3d27b32-19c9-4359-b064-d2fc8d26318c)|![스크린샷 2023-12-07 04-40-36](https://github.com/Duboo31/final_project_teulang_client/assets/92058864/7eb95ebb-5890-47a4-9afe-ec9375ad33a9)|
> 재료 이미지를 등록해서 어떤 재료인지 AI가 파악하고 해당 재료에 대한 레시피를 추천 해주는 기능

