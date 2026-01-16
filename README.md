# 🎉 WOW Event – Event Form (Dev)

WOW Event 서비스의 **이벤트 참여 폼(Event Form)** 페이지입니다.  
사용자는 이벤트 정보를 확인하고, 폼을 작성하여 이벤트에 참여할 수 있습니다.

- **Demo (Dev)**  
  https://dev-event.wawoo.dev/event/2

---

## 주요 기능

### 이벤트 정보 조회

- URL의 `eventId`를 기반으로 이벤트 정보 조회
- 이벤트 제목, 설명, 일정 등 기본 정보 표시

### 이벤트 참여 폼

- 서버에서 전달된 폼 스키마 기반 동적 렌더링
- 필수 / 선택 항목 구분
- 입력값 유효성 검사

### 폼 제출

- 사용자 입력 데이터를 서버로 전송하여 참여 등록
- 성공 / 실패에 따른 사용자 피드백 제공

---

## URL 구조

```
/event/:eventId
```

예시:

```
/event/2
```

- `eventId`: 이벤트를 식별하는 고유 ID

---

## 기술 스택

- React
- TypeScript
- Next.js (App Router)
- Emotion / Styled Components
- Deployment: Vercel

---

## 데이터 흐름

```
페이지 진입
  ↓
eventId 기반 이벤트 정보 요청
  ↓
이벤트 정보 + 참여 폼 렌더링
  ↓
사용자 입력 및 유효성 검사
  ↓
폼 제출
  ↓
이벤트 참여 완료
```

---

## 개발 / 배포 구조

- 팀 레포지토리를 fork하여 배포 전용으로 사용
- 원본 레포의 `main`, `dev` 브랜치 변경 사항을 fork 레포로 자동 동기화
- Vercel을 통해 dev 환경 배포

- 원본 레포: https://github.com/gdg-hongik-univ/wow-event
- Fork 레포: https://github.com/wawoo-dev/wow-event

---

## 참고 사항

- 본 페이지는 **개발 환경(dev)** 기준입니다.
- 이벤트 상태에 따라 참여가 제한될 수 있습니다.
- 실제 운영 환경에서는 이벤트 데이터가 달라질 수 있습니다.

---

## 👥 팀 프로젝트

본 프로젝트는 팀 과제로 진행되었습니다.
