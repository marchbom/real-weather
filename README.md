# 🌤️ Real Weather App

실시간 날씨 정보를 제공하는 React 기반 웹 애플리케이션입니다.  
현재 위치의 날씨와 즐겨찾기한 위치의 날씨를 한눈에 확인할 수 있습니다.

| 현재 위치 날씨 | 즐겨찾기 |
|:--:|:--:|
| <img width="280" alt="현재 위치 날씨" src="https://github.com/user-attachments/assets/10a9cc81-74b0-4873-889a-b10932eab07c" /> | <img width="280" alt="즐겨찾기" src="https://github.com/user-attachments/assets/f583d554-2acb-4706-a6a7-b5595286fc12" /> |

## 프로젝트 개요

- **기술 스택**: React 19, TypeScript, Vite
- **아키텍처**: FSD (Feature-Sliced Design)
- **스타일링**: Tailwind CSS v4
- **상태 관리**: Zustand, TanStack Query
- **애니메이션**: Framer Motion
- **날씨 API**: OpenWeatherMap API

---

## 실행 방법

### 1) 프로젝트 클론
```bash
git clone https://github.com/marchbom/real-weather.git
cd real-weather
```
### 2) 패키지 설치
```
npm install
```

### 3) 환경 변수 설정
프로젝트 루트에 .env 파일 생성 후 아래 값을 복사해 입력합니다.
```
VITE_OPENWEATHER_API_KEY=
VITE_KAKAO_REST_API_KEY=
```
> API Key 값은 보안을 위해 레포에 포함하지 않았으며, 메일로 별도 전달드립니다.


### 4) 실행
```
npm run dev
```

## 주요 기능

### 1. 현재 위치 날씨
- 사용자의 현재 위치 감지(위치 설정 동의)
- 실시간 기온 및 체감 온도 표시
- 시간대별 날씨
- 7일간 일기예보
- 날씨에 따른 동적 배경 이미지

### 2. 즐겨찾기 관리
- 원하는 위치를 즐겨찾기에 추가
- 한국 행정구역 검색 (Kakao Geocoding API)
- 별칭 설정 및 수정
- 삭제 시 부드러운 슬라이드 애니메이션

### 3. UX/UI 기능
- Glass morphism 디자인
- 스켈레톤 로딩 UI
- 페이드/슬라이드 애니메이션
- 반응형 디자인 (모바일/데스크톱)
- 날씨별 배경 이미지 자동 전환

## 아키텍처: FSD (Feature-Sliced Design)

```
src/
├── app/                    # 앱 레벨 설정
│   ├── App.tsx            # 라우팅 및 전역 설정
│   └── store/             # 전역 상태 관리
│
├── pages/                  # 라우트별 페이지
│   ├── main/              # 메인 페이지 (현재 위치)
│   ├── favorites/         # 즐겨찾기 관리
│   ├── favorites-detail/  # 즐겨찾기 상세
│   └── weather-detail/    # 날씨 상세 정보
│
├── widgets/                # 복합 UI 블록
│   └── ui/
│       └── FavoritesHeader.tsx
│
├── features/               # 사용자 기능
│   ├── current-weather/   # 현재 날씨 정보
│   ├── hourly-weather/    # 시간대별 날씨
│   ├── weekly-weather/    # 주간 예보
│   ├── favorites/         # 즐겨찾기 카드
│   └── fetch-weather/     # 날씨 데이터 fetch
│
├── entities/               # 비즈니스 엔티티
│   ├── weather/           # 날씨 엔티티
│   │   ├── model/         # 날씨 타입 정의 
│   │   ├── lib/           # 날씨 유틸 
│   │   └── ui/            # 날씨 아이콘
│   ├── location/          # 위치 엔티티
│   └── address/           # 주소 엔티티
│
└── shared/                 # 공유 리소스
    ├── api/               # API 클라이언트
    ├── ui/                # 공통 UI 컴포넌트
    ├── lib/               # 유틸리티 함수
    ├── config/            # 환경 설정
    └── constants/         # 상수 (에러 메시지)
```

## 구현 시 고민한 점

### 상태 관리
전역 상태 관리와 서버 상태 관리를 어떻게 분리할 것인가?

- **Zustand**: 클라이언트 전역 상태 (즐겨찾기, 위치별 날씨에 맞는 배경)

- **TanStack Query**: 서버 상태 (날씨 데이터, 위치 정보)
- 자동 캐싱 및 리페칭
- 로딩/에러 상태 자동 관리
- Stale time 설정으로 불필요한 API 호출 방지 (10분)

### 즐겨찾기 카드 애니메이션
- 카드가 오른쪽으로 슬라이드되며 사라짐
- 나머지 카드들이 자동으로 부드럽게 재배치 (`layout` prop)
- `AnimatePresence`로 DOM 제거 시에도 애니메이션 유지

### 날씨 배경 이미지
- 날씨 메인 상태 (Clear, Clouds, Rain, Snow 등)에 따라 배경 이미지 자동 변경
- `entities/weather/lib/getWeatherBackground.ts`로 로직 분리
- 전역 상태로 관리하여 페이지 전환 시에도 일관성 유지


### 번들 크기 최적화
- 즐겨찾기 관련 페이지들을 lazy loading으로 분리
- JSON 동적 import: 대용량 한국 주소 데이터를 필요할 때만 로드
- 메인 번들 74% 감소: 1,410KB에서 361KB로 축소 (gzip: 282KB에서 124KB로 축소)
- 각 페이지는 2~5KB의 작은 청크로 분리되어 필요 시에만 다운로드

### 주소 정규화
- 원본 데이터 형식의 일부 주소가 붙어있어 가독성 저하
- 사용자가 검색할 때의 자연스러운 형태와 불일치
- 정규식으로 특정 패턴만 분리하여 과도한 분리 방지
- 검색 키워드도 동일한 방식으로 정규화하여 일관된 매칭


## 사용한 라이브러리

| 라이브러리 | 사용 이유 |
|-----------|----------|
| **TypeScript** | 타입 안정성 및 개발 생산성 향상 |
| **Framer Motion** | 선언적이고 부드러운 애니메이션 구현 |
| **TanStack Query** | 서버 상태 관리, 캐싱, 자동 리페칭 |
| **Zustand** | 클라이언트 전역 상태 관리 |
| **React Router** | SPA 라우팅 |
| **Axios** | HTTP 클라이언트, 인터셉터 활용 |
| **Lucide React** | 검색 아이콘 등 UI 아이콘 |
| **React Icons** | 추가 아이콘 세트 |

---

## 주요 화면

### 메인 화면 (위치 정보를 허용해야 합니다.)
- 현재 위치 기반의 날씨 정보
- 시간대별 날씨 (가로 스크롤)
- 7일간 일기예보

### 즐겨찾기 목록
- 저장된 위치들의 날씨 카드
- 각 카드 클릭 시 상세 정보로 이동
- 빈 상태 UI

### 즐겨찾기 추가
- 한국 행정구역 검색
- 실시간 검색 결과 표시(디바운스 적용)
- 선택 시 즐겨찾기에 추가

### 즐겨찾기 편집
- 별칭 입력/수정
- 삭제 (슬라이드 애니메이션)


---

## 향후 개선 계획

### 날씨별 세밀한 배경 이미지
**현재 상태**:
- 주요 날씨 상태에 따른 배경 이미지 제공
  - Clear (맑음), Clouds (구름), Rain (비), Snow (눈), Thunderstorm (번개)

**개선 방향**:
- 더 디테일한 날씨 상태별 배경 이미지 추가
- 더 정확한 날씨 상태 시각화
- 날씨 정보의 직관적 전달
