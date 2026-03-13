# payot-inc/nuxt — Nuxt 스타터 템플릿

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38BDF8?logo=tailwindcss&labelColor=0f172a)](https://tailwindcss.com)
[![Bun](https://img.shields.io/badge/Package%20Manager-Bun-fbf0df?logo=bun&labelColor=14151a)](https://bun.sh)

Nuxt UI + Tailwind CSS v4 + VueUse가 사전 구성된 Nuxt 프로젝트 템플릿입니다.

---

## 프로젝트 생성

```bash
bunx nuxi init {프로젝트명} -t gh:payot-inc/nuxt
```

예시:

```bash
bunx nuxi init my-app -t gh:payot-inc/nuxt
```

---

## 포함된 스택

| 패키지 | 설명 |
|--------|------|
| [Nuxt](https://nuxt.com) v4 | Vue 기반 풀스택 프레임워크 |
| [Nuxt UI](https://ui.nuxt.com) v4 | Tailwind CSS 기반 UI 컴포넌트 라이브러리 |
| [Tailwind CSS](https://tailwindcss.com) v4 | 유틸리티 퍼스트 CSS 프레임워크 |
| [VueUse](https://vueuse.org) | Vue Composition API 유틸리티 모음 |
| [dayjs-nuxt](https://github.com/fumeapp/dayjs-nuxt) | 날짜/시간 처리 라이브러리 |
| [Lucide Icons](https://lucide.dev) | 깔끔한 오픈소스 아이콘 세트 |
| [Simple Icons](https://simpleicons.org) | 브랜드 아이콘 세트 |

### 기본 설정

- **SSR**: 비활성화 (클라이언트 사이드 렌더링)
- **기본 컬러**: Primary — Green `#00DC82`, Neutral — Slate
- **패키지 매니저**: Bun
- **TypeScript**, **ESLint** 사전 구성

---

## 설치 및 개발 서버

```bash
# 의존성 설치
bun install

# 개발 서버 실행 (http://localhost:3000)
bun dev
```

---

## 빌드 및 미리보기

```bash
# 프로덕션 빌드
bun run build

# 빌드 결과 로컬 미리보기
bun run preview
```

---

## 코드 품질

```bash
# ESLint 실행
bun run lint

# TypeScript 타입 검사
bun run typecheck
```

---

## 디렉토리 구조

```
├── app/
│   ├── assets/css/main.css   # 전역 스타일
│   ├── components/           # Vue 컴포넌트
│   ├── pages/                # 라우트 페이지
│   └── app.config.ts         # UI 테마 설정
├── public/                   # 정적 파일
├── nuxt.config.ts            # Nuxt 설정
└── eslint.config.mjs         # ESLint 설정
```

---

## 참고 링크

- [Nuxt 공식 문서](https://nuxt.com/docs)
- [Nuxt UI 문서](https://ui.nuxt.com/docs)
- [VueUse 문서](https://vueuse.org)
- [배포 가이드](https://nuxt.com/docs/getting-started/deployment)
