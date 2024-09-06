# Node.js API 개발

이 프로젝트는 Node.js와 Express를 사용하여 개발된 API입니다. PostgreSQL을 데이터베이스로 사용하며, 모듈화된 구조로 확장성과 유지보수성을 고려하여 설계되었습니다.

## 프로젝트 구조

프로젝트는 각각의 기능에 따라 디렉토리로 나누어져 있으며, 이를 통해 코드의 유지보수성과 확장성을 높였습니다.

- **src/** # 소스 코드 
- **config/** # 데이터베이스 및 환경 변수 설정 파일
- **controllers/** # API 엔드포인트에 대한 비즈니스 로직 
- **middlewares/** # 미들웨어 (예: 인증) │
- **models/** # 데이터베이스 모델 (PostgreSQL과 Sequelize 사용) 
- **routes/** # API 라우트 설정 
- **services/** # 외부 API 호출 등 서비스 로직
- **utils/** # 유틸리티 함수 모음 


## 설치된 NPM 패키지 목록

- **express**: 웹 서버 및 라우팅을 위한 Node.js 프레임워크
- **pg**: PostgreSQL 데이터베이스 클라이언트
- **sequelize**: ORM(Object-Relational Mapping) 라이브러리
- **dotenv**: 환경 변수를 로드하기 위한 라이브러리
- **jsonwebtoken**: JWT(Json Web Token)를 사용한 인증을 위한 라이브러리
- **bcrypt**: 비밀번호 해싱을 위한 라이브러리
- **nodemailer**: 이메일 전송을 위한 라이브러리
- **helmet**: 보안 관련 HTTP 헤더 설정을 위한 미들웨어
- **morgan**: HTTP 요청 로깅을 위한 미들웨어
- **cors**: Cross-Origin Resource Sharing(CORS) 미들웨어

## 설치 및 실행 방법
npm ./src/server.js OR
nodemon ./src/server.js

## .env 예제
PORT=3000
JWT_SECRET=secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USERNAME=your-username
DB_PASSWORD=your-passowrd

## 실행
npm run start
npm run dev (.env.develop 필요 )