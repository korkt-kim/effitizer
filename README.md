# EffiTizer

숏폼 전자책 서비스를 위한 웹 사이트 [에피타이저](https://effitizer.vercel.app)의 소스 코드입니다.

## 사용 기술

- [React](https://reactjs.org/), [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [SCSS](https://sass-lang.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [React Query](https://react-query-v3.tanstack.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Ladle](https://ladle.dev/)
- [Mock Service Worker](https://mswjs.io/)

## 로컬에서 실행하기

**1.** 프로젝트 루트에 `.env.local` 파일을 생성해 환경 변수를 설정합니다.

```bash
API_HOST="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
```

- `API_HOST`: 서버 주소. 로컬에서 mock server를 사용해 실행하는 경우에는 `http://localhost:3000`을 사용합니다.
- `NEXTAUTH_URL`: Production 환경 배포 시 사이트의 canonical URL으로 지정합니다.

소셜 계정 로그인을 동작시키려면 서비스에 따라 아래 환경 변수를 추가합니다.

| 서비스 | 환경 변수                    | 관련 문서                                         |
| ------ | ---------------------------- | ------------------------------------------------- |
| Google | `GOOGLE_ID`, `GOOGLE_SECRET` | [Link](https://next-auth.js.org/providers/google) |
| 카카오 | `KAKAO_ID`, `KAKAO_SECRET`   | [Link](https://next-auth.js.org/providers/kakao)  |
| 네이버 | `NAVER_ID`, `NAVER_SECRET`   | [Link](https://next-auth.js.org/providers/naver)  |

**2.** 패키지 설치 후 개발 서버를 실행합니다.

```bash
yarn
yarn dev
```

**3.** 브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속합니다.

## 배포하기

Next.js 문서의 [Deployment](https://nextjs.org/docs/deployment) 페이지를 참고하세요.

### 소셜 계정 로그인을 연결하는 경우

Production 환경 배포 시 `NEXTAUTH_SECRET` 환경 변수를 추가로 설정해야 합니다. ([관련 문서](https://next-auth.js.org/configuration/options#secret))

## 남은 작업

- [ ] 구독 완료 화면
- [ ] 구독 완료 후 컨텐츠 페이지
- [ ] 마이페이지
