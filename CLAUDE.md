# CLAUDE.md — teamficial-fe-new

## 프로젝트 개요

**팀피셜** 리뉴얼 프론트엔드 레포지토리.  
소프트 스킬 기반 팀 빌딩 및 채용 플랫폼으로, 모바일 only 버전으로 재설계.

- **레포**: `github.com/TEAMFICIAL/teamficial-fe-new`
- **배포 브랜치**: `main` (production) / `develop` (개발)
- **타겟**: 모바일 only (데스크탑 미지원)

---

## 기술 스택

| 분류            | 기술                    |
| --------------- | ----------------------- |
| Framework       | Next.js 16 (App Router) |
| Language        | TypeScript 5            |
| Runtime         | React 19                |
| Styling         | Tailwind CSS v4         |
| Package Manager | pnpm                    |

### 설치된 라이브러리

```json
dependencies
├── @next/third-parties ^16.2.9   # GA
├── @tanstack/react-query ^5.101.0
├── axios ^1.17.0
├── clsx ^2.1.1
├── react-intersection-observer ^10.0.3
├── tailwind-merge ^3.6.0
└── zustand ^5.0.14

devDependencies
├── @svgr/cli ^8.1.0
├── @svgr/webpack ^8.1.0
├── prettier ^3.8.4
└── prettier-plugin-tailwindcss ^0.8.0
```

> 라이브러리 추가 시 반드시 이 파일도 업데이트할 것.

---

## 폴더 구조 (FSD — Feature-Sliced Design)

```
src/
├── app/                        # 라우팅 전용. UI 로직 최소화
│   ├── layout.tsx
│   ├── loading.tsx             # 공통 로딩 (전체 라우트 적용)
│   ├── page.tsx                # 루트 → /login 리다이렉트
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   └── [logId]/                # 팀피셜록 페이지
│       └── page.tsx
│
├── views/                      # 페이지 단위 UI 조합 (app/은 얇게 유지) — FSD pages 레이어. Next.js src/pages/ 충돌로 views/ 사용
│   ├── login/
│   │   └── LoginPage.tsx
│   └── teamficiallog/
│       └── TeamficialLogPage.tsx
│
├── features/                   # 사용자 행동 단위 (인터랙션 중심)
│   └── auth/
│       ├── api/
│       ├── hooks/
│       ├── store/
│       └── ui/
│
├── entities/                   # 도메인 모델 (타입, API, 순수 표시 UI)
│   ├── user/
│   │   ├── api/
│   │   ├── model/              # 타입 정의
│   │   └── ui/                 # UserAvatar 등
│   └── team/
│       ├── api/
│       ├── model/
│       └── ui/
│
├── shared/                     # 도메인 무관 공통 리소스
│   ├── api/
│   │   ├── axios.ts            # axios 인스턴스 및 interceptor
│   │   └── auth.ts             # 토큰 리프레시 (plain axios 인스턴스 사용)
│   ├── components/
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── IconButton.tsx
│   │       └── icons/          # SVGR 컴포넌트화된 아이콘
│   ├── hooks/
│   ├── lib/
│   │   └── utils.ts
│   └── types/
│
└── public/
    ├── favicon.ico
    ├── apple-touch-icon.png
    └── icons/
```

### 레이어 import 규칙

```
app → views → features → entities → shared
```

- 상위 레이어만 하위 레이어를 import할 수 있다.
- 같은 레이어 간 import 금지 (예: `features/auth`가 `features/team-profile`을 import하는 것 금지).
- `shared`는 어디서든 import 가능.

---

## 페이지 구성

현재 구현 대상 페이지는 2개.

| 페이지   | 경로       | 설명                       |
| -------- | ---------- | -------------------------- |
| 로그인   | `/login`   | 카카오 및 구글 소셜 로그인 |
| 팀피셜록 | `/[logId]` | 개인 팀피셜록 페이지       |

> 온보딩 페이지는 추후 추가 예정.

---

## 개발 규칙

### 일반

- **모바일 only**: 데스크탑 레이아웃 불필요. 반응형 분기 최소화.
- **TypeScript strict**: `any` 타입 사용 금지. 타입 추론이 불가한 경우 명시적 타입 정의.
- **컴포넌트 파일명**: PascalCase (`IconButton.tsx`)
- **훅 파일명**: camelCase with `use` prefix (`useAuth.ts`)
- **서버/클라이언트 분리**: 레이아웃 레벨 컴포넌트에 `"use client"` 금지. 클라이언트 로직은 wrapper 컴포넌트로 분리.

### Tailwind CSS v4

- 인라인 `style={{ display }}` 대신 순수 Tailwind 클래스 토글 사용 (specificity 충돌 방지).
- `clsx` + `tailwind-merge`를 함께 사용한다.

```ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs));
```

### 아이콘

- 아이콘은 SVGR로 컴포넌트화하여 `shared/components/ui/icons/`에 위치.
- 직접 `<svg>` 태그를 인라인으로 작성하지 않는다.
- `IconButton`은 아이콘 컴포넌트를 props로 받아 렌더링.

```tsx
import { ShareIcon } from "@/shared/components/ui/icons";
import { IconButton } from "@/shared/components/ui/IconButton";

<IconButton icon={ShareIcon} label="공유하기" onClick={handleShare} />;
```

### 이미지 최적화

- `<img>` 태그 대신 Next.js `<Image>` 컴포넌트 사용.
- 키워드 버튼 등 반복 렌더링 이미지는 `sizes` prop 명시.
- SVG 아이콘은 SVGR, 래스터 이미지는 `next/image`.

### HTTP 클라이언트

- **axios**: 인증이 필요한 API 요청 전반. 반드시 `shared/api/axios.ts` 인스턴스를 통한다.
- **fetch**: Next.js 서버 컴포넌트에서 `cache`, `revalidate` 등 Next.js 고유 캐싱 기능이 필요한 경우에만 사용.
- 인증이 필요한 요청에 fetch 사용 금지 (interceptor 없어 토큰 처리 불가).

### 상태 관리

- **서버 상태**: TanStack Query (React Query)
- **클라이언트 상태**: Zustand
- 둘을 혼용하지 말 것.

### 인증 (JWT)

- Access token + Refresh token 패턴
- 토큰 저장: `localStorage`
- **Axios interceptor 주의사항**:
  - 토큰 리프레시 요청은 interceptor가 붙은 인스턴스가 아닌 **plain axios 인스턴스** 사용 (무한루프 방지)
  - 동시 401 처리: `isRefreshing` 플래그 + `failedQueue` 패턴 적용

### 날짜 처리

- Safari 날짜 파싱 이슈: `"2026.01.10 08:56:11"` 형식은 모바일 Safari에서 `Invalid Date`.
- 반드시 ISO 8601 형식으로 정규화 후 `new Date()` 사용.

```ts
const normalizeDate = (str: string) =>
  str.replace(/\./g, "-").replace(" ", "T");
```

### React 렌더링

- 리렌더링 유발하지 않을 플래그 값은 `useRef` 사용 (dismissal 추적, alert 중복 방지 등).
- `useCallback`으로 함수 참조 안정화 → `useEffect` 무한루프 방지.

---

## Next.js App Router 주의사항

- `generateMetadata`는 `"use client"` 컴포넌트에서 export 불가 → 서버/클라이언트 컴포넌트 분리 필수.
- Open Graph 이미지 경로는 절대 URL 사용.
- Hydration 이슈 방지를 위해 Suspense boundary 적절히 배치.
- 로딩 상태는 `app/loading.tsx` 하나로 전체 라우트 공통 처리. Next.js가 내부적으로 Suspense로 감싸며, 서버 컴포넌트 데이터 fetching 중에 노출됨.
- 클라이언트 fetching(`useQuery` 등)은 `loading.tsx`와 무관하므로 React Query의 `isPending` 상태로 별도 처리.

---

## 파비콘

필요한 파일:

```
public/
├── favicon.ico
├── apple-touch-icon.png    # 180x180 (iPhone Safari 북마크용)
└── favicon-96x96.png
```

- `realfavicongenerator.net`에서 생성 권장.
- `app/layout.tsx`의 `metadata`에 명시:

```ts
export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
```

---

## GA (Google Analytics)

`@next/third-parties` 사용:

```tsx
// app/layout.tsx
import { GoogleAnalytics } from "@next/third-parties/google";

<GoogleAnalytics gaId="G-XXXXXXXXXX" />;
```

---

## 배포

- **플랫폼**: AWS Amplify (서울 리전 `ap-northeast-2`)
- **배포 브랜치**: `main`
- **개발 브랜치**: `develop`
- **전략**: `develop` → `main` PR merge 후 Amplify 자동 배포
- SSL 인증서: Amplify 자동 발급 or ACM 연동 (백엔드팀과 도메인 협의 필요)

### GitHub Actions

```
.github/workflows/
├── ci.yml          # PR 생성 시 build check
└── deploy.yml      # develop → main merge 시 Amplify webhook 트리거
```

---

## 커밋 컨벤션

```
feat: 새 기능
fix: 버그 수정
refactor: 코드 개선 (기능 변경 없음)
style: 스타일 변경
chore: 설정, 패키지 등
docs: 문서
```

---

## 환경변수

```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_KAKAO_CLIENT_ID=
NEXT_PUBLIC_KAKAO_REDIRECT_URI=
NEXT_PUBLIC_KAKAO_JS_KEY=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=
```
