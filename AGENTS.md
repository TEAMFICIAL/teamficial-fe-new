<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — teamficial-fe-new

AI 에이전트(Claude Code 등)가 이 레포에서 작업할 때 따르는 행동 지침.
CLAUDE.md의 개발 규칙을 전제로 하며, 이 파일은 작업 방식·판단 기준에 집중한다.

---

## 기본 원칙

- 코드 작성 전 반드시 CLAUDE.md를 먼저 읽는다.
- 파일 수정 전 항상 기존 코드를 먼저 파악한다. 추측으로 작성하지 않는다.
- 확실하지 않은 스펙은 구현하지 않고 질문한다.
- 불필요한 라이브러리를 임의로 추가하지 않는다.

---

## 폴더 구조 (FSD)

```
src/
├── app/                        # 라우팅 전용. UI 로직 최소화
│   ├── layout.tsx
│   ├── loading.tsx             # 공통 로딩 (전체 라우트 적용)
│   ├── page.tsx                # 루트 → /login 리다이렉트
│   ├── login/
│   │       └── page.tsx
│   ├── review/[logId]/
│   │       └── page.tsx
│   └── teamficiallog/[logId]/                # 팀피셜록 페이지
│       └── page.tsx
│
├── views/                  # 페이지 단위 UI 조합 (app/은 얇게 유지)
│   ├── login/
│   │   └── LoginPage.tsx
│   ├── review/
│   │   └── ReviewPage.tsx
│   └── teamficiallog/
│       └── TeamficialLogPage.tsx
│
├── features/               # 사용자 행동 단위 (인터랙션 중심)
│   └── auth/
│       ├── api/
│       ├── hooks/
│       ├── store/
│       └── ui/
│
├── entities/               # 도메인 모델 (타입, API, 순수 표시 UI)
│   ├── user/
│   │   ├── api/
│   │   ├── model/          # 타입 정의
│   │   └── ui/             # UserAvatar 등 순수 표시용 컴포넌트
│   └── team/
│       ├── api/
│       ├── model/
│       └── ui/
│
├── shared/                 # 도메인 무관 공통 리소스
│   ├── api/
│   │   ├── axios.ts
│   │   └── auth.ts
│   ├── components/
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── IconButton.tsx
│   │       └── icons/      # SVGR 컴포넌트화된 아이콘
│   ├── hooks/
│   ├── lib/
│   │   └── utils.ts        # cn() 유틸 (clsx + tailwind-merge)
│   └── types/
│
└── public/
```

### 레이어 import 규칙

```
app → views → features → entities → shared
```

- 상위 레이어만 하위 레이어를 import할 수 있다.
- 같은 레이어 간 import 금지 (예: `features/auth`가 `features/team-profile`을 import하는 것 금지).
- `shared`는 어디서든 import 가능.

### 레이어 판단 기준

| 무엇을 만드나                     | 어느 레이어 |
| --------------------------------- | ----------- |
| 라우트 진입점                     | `app/`      |
| 페이지 전체 레이아웃 조합         | `pages/`    |
| 버튼 클릭 등 사용자 행동·인터랙션 | `features/` |
| 도메인 모델·타입·순수 표시 UI     | `entities/` |
| 도메인 무관 유틸·공통 컴포넌트    | `shared/`   |

---

## 컴포넌트 작성 규칙

### 기본

- `"use client"`는 필요한 최소 단위 컴포넌트에만 선언한다.
- props 타입은 컴포넌트 파일 내 상단에 `interface`로 명시한다.
- 컴포넌트 파일 하나에 컴포넌트 하나. 관련 타입·훅은 같은 파일에 둬도 무방하나, 복잡해지면 분리한다.

### 클래스 병합

`shared/lib/utils.ts`의 `cn()` 유틸을 사용한다. 인라인 `style` 속성 사용 금지.

```ts
import { cn } from '@/shared/lib/utils';

<div className={cn('base-class', isActive && 'active-class')} />
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

---

## API 및 인증

### HTTP 클라이언트

```
shared/api/axios.ts   — interceptor 붙은 인스턴스 (인증 필요한 API 요청용)
shared/api/auth.ts    — plain axios 인스턴스 (토큰 리프레시 전용)
```

- **axios**: 인증이 필요한 API 요청 전반. 반드시 `axios.ts` 인스턴스를 통한다.
- **fetch**: Next.js 서버 컴포넌트에서 `cache`, `revalidate` 등 Next.js 고유 캐싱 기능이 필요한 경우에만 사용.
- 인증이 필요한 요청에 fetch 사용 금지 (interceptor 없어 토큰 처리 불가).
- 리프레시 요청에 절대 `axios.ts`의 인스턴스를 사용하지 않는다 (무한루프).
- 동시 401 발생 시 `isRefreshing` + `failedQueue` 패턴으로 처리.

### React Query

- API 호출 함수는 `entities/{domain}/api/` 또는 `features/{feature}/api/`에 위치.
- Query key는 도메인별로 상수 파일(`queryKeys.ts`)로 관리.
- `suspense: true` 옵션 사용 시 반드시 Suspense boundary 확인.

---

## 로딩 / 에러 처리

- 로딩 상태는 `app/loading.tsx` 하나로 전체 라우트 공통 처리. Next.js가 내부적으로 Suspense로 감싸며, 서버 컴포넌트 데이터 fetching 중에 노출됨.
- 클라이언트 fetching(`useQuery` 등)은 `loading.tsx`와 무관하므로 React Query의 `isPending` 상태로 별도 처리.
- 에러 처리는 `error.tsx` + Error Boundary 활용.

---

## 작업 흐름

### 새 기능 작업 시

1. 어느 레이어에 속하는지 판단 (위 판단 기준 참고).
2. 해당 레이어 하위에 디렉토리·파일 생성.
3. import 방향 위반 여부 확인 후 구현.
4. 새 라이브러리가 필요하다면 추가 전에 사용자에게 확인.

### PR 전 체크리스트

- [ ] `any` 타입 미사용
- [ ] `"use client"` 최소 범위 적용
- [ ] FSD import 방향 준수 (`app → pages → features → entities → shared`)
- [ ] `<img>` 대신 `<Image>` 사용
- [ ] 인라인 `style` 속성 미사용 (`cn()` 유틸 사용)
- [ ] 날짜 문자열 ISO 8601 정규화
- [ ] 환경변수 `.env.local` 미커밋
- [ ] `pnpm build` 통과

---

## PR 자동 생성

사용자가 "PR 만들어줘" 또는 이와 유사한 명령을 입력하면, 아래 순서로 PR을 생성한다.

### 절차

1. 현재 브랜치명에서 이슈 번호 추출 (`feature/#9-login` → `#9`)
2. `git status`, `git diff develop...HEAD`로 변경사항 분석
3. 변경되지 않은 커밋이 있다면 먼저 커밋 (커밋 컨벤션 준수)
4. 아래 PR 템플릿에 맞춰 본문 작성
5. `gh pr create`로 PR 생성 (base: `develop`, head: 현재 브랜치)

### PR 제목 형식

```
#이슈번호 [타입] 작업명
```

예: `#9 [UI] 로그인 컴포넌트 구현`

- 타입은 변경 내역을 보고 가장 적합한 것으로 판단: `FEAT`, `MOD`, `ADD`, `CHORE`, `DEL`, `UI`, `FIX`, `MOVE`, `RENAME`, `REFACTOR`, `DOCS`
- 작업명은 브랜치명의 슬러그 또는 변경 내역 요약으로 작성

### PR 본문 템플릿

```markdown
## ✅ PR 유형

어떤 변경 사항이 있었나요?

- [ ] 새로운 기능 추가
- [ ] 버그 수정
- [ ] 코드에 영향을 주지 않는 변경사항(오타 수정, 탭 사이즈 변경, 변수명 변경)
- [ ] 코드 리팩토링
- [ ] 주석 추가 및 수정
- [ ] 문서 수정
- [ ] 빌드 부분 혹은 패키지 매니저 수정
- [ ] 파일 혹은 폴더명 수정
- [ ] 파일 혹은 폴더 삭제

---

### 📌 관련 이슈번호

- Closed #이슈번호

---

### ✅ Key Changes

- (변경 내역 기반으로 자동 작성)

---

### 📸 스크린샷 or 실행영상

<!-- 필요 시 사용자가 직접 첨부 -->

---

## 🎸 기타 사항 or 추가 코멘트
```

### 작성 시 주의사항

- "PR 유형" 체크박스는 변경 내역을 분석해 해당하는 항목에 `[x]` 표시.
- "Key Changes"는 `git diff` 기반으로 실제 변경된 파일·로직을 구체적으로 작성 (추상적 표현 금지).
- 스크린샷/실행영상 항목은 비워두고 주석만 남긴다 (사용자가 직접 첨부).
- 이슈 번호를 브랜치명에서 추출할 수 없으면 사용자에게 확인.

---

## 하지 말아야 할 것

- `any` 타입 사용
- 같은 FSD 레이어 간 import
- `app/layout.tsx`에 `"use client"` 선언
- 토큰 리프레시에 interceptor 인스턴스 사용
- `<svg>` 인라인 작성 (SVGR 사용)
- `<img>` 인라인 태그 사용 (next/image 사용)
- 인라인 `style` 속성 사용 (`cn()` 사용)
- `.env.local` 커밋
- 스펙 불명확 시 임의 구현
- 임의 라이브러리 추가
