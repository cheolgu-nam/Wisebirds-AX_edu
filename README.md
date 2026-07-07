# Wisebirds 앱 광고 교육 · 중급편 (W-Insight)

Wisebirds 사내 교육 **W-Insight** 앱 광고 교육 **중급편** 웹 프레젠테이션입니다.
스크롤 스냅 방식으로 한 화면에 한 슬라이드씩 넘어가며, 우측 도트 네비게이션으로 이동합니다.

- **목표** : 앱 광고 방식의 확장
- **A. 앱 리타겟팅** — Re-engagement vs Re-attribution, MMP 핵심 설정(Appsflyer 기준), iOS 제약과 측정
- **B. iOS SKAN** — 왜 SKAN인가, Conversion Value & 다중 포스트백, 설정과 리포팅
- **C. 웹투앱 · 앱투웹** — 딥링크/Deferred Deep Link, OneLink 라우팅, 경계를 넘는 측정 연속성

기초편 PDF(`doc/`)의 브랜드·디자인 시스템을 계승했고, 각 주제는 Appsflyer/Apple 등
공식 문서를 웹 리서치로 교차확인해 작성했습니다.

## 기술 스택

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS 3** — Wisebirds 브랜드 토큰(코랄/블루/틸)
- **Framer Motion** — 스크롤 진입 애니메이션
- **lucide-react** — 아이콘
- **Pretendard** — 한글 웹폰트(CDN)

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 (포트 사용 중이면 3001 등) 접속.

## 조작

| 동작 | 방법 |
| --- | --- |
| 다음/이전 슬라이드 | 스크롤, `↓`/`↑`, `PageDown`/`PageUp`, `Space` |
| 특정 슬라이드로 이동 | 우측 도트 클릭 |
| 처음/끝으로 | `Home` / `End` |

## 빌드 & 배포

```bash
npm run build   # 프로덕션 빌드 (정적 프리렌더)
npm run start   # 빌드 결과 실행
```

Vercel 배포는 추후 진행 예정입니다. (이 저장소를 Vercel에 연결하면
별도 설정 없이 자동 빌드됩니다.)

## 구조

```
src/
  app/
    layout.tsx        # 루트 레이아웃 · 메타데이터
    globals.css       # 스크롤 스냅 · Pretendard · 유틸리티
    page.tsx          # 슬라이드 레지스트리(순서/네비 라벨/색상)
  components/
    Deck.tsx          # 스크롤 스냅 컨트롤러 · 활성 슬라이드 추적 · 키보드
    SideNav.tsx       # 우측 도트 네비게이션
    Chrome.tsx        # 상단/하단 · 프레임 등 고정 크롬
    Logo.tsx          # wisebirds 로고
    slide-kit.tsx     # 공용 슬라이드 컴포넌트(카드/플로우/표/키포인트 등)
    slides/
      intro.tsx       # 표지 · 기초편 복습 · 목표/Agenda
      retargeting.tsx # A. 앱 리타겟팅
      skan.tsx        # B. iOS SKAN
      web2app.tsx     # C. 웹투앱 · 앱투웹
      closing.tsx     # 핵심 요약 · Q&A
doc/                  # 기초편 원본 PDF
```

© 2026 Wisebirds Inc. All Rights Reserved.
