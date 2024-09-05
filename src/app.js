const express = require("express"); // Express 프레임워크 호출
const cors = require("cors"); // CORS(Cross-Origin Resource Sharing)를 활성화하는 미들웨어
const helmet = require("helmet"); // 보안을 위한 HTTP 헤더를 설정하는 Helmet 미들웨어
const morgan = require("morgan"); // HTTP 요청 로깅을 위한 Morgan 미들웨어
const userRoutes = require("./routes/userRoutes"); // 사용자 관련 라우트를 정의한 모듈

const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./config/swaggerOptions"); //  Swagger 설정 파일



const app = express(); // Express 애플리케이션을 생성합니다.

app.use(cors()); // CORS 미들웨어를 사용하여 모든 도메인에서의 요청을 허용합니다.
app.use(helmet()); // Helmet 미들웨어를 사용하여 보안 관련 HTTP 헤더를 설정합니다.
app.use(morgan("dev")); // Morgan 미들웨어를 사용하여 개발 환경에서 HTTP 요청을 로깅합니다.
app.use(express.json()); // 요청 바디를 JSON 형식으로 파싱하는 미들웨어를 사용합니다.
app.use("/api/users", userRoutes); 

// Swagger UI 라우트 추가
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


module.exports = app; // 애플리케이션 객체를 모듈로 내보냅니다. 서버가 이 객체를 사용하여 애플리케이션을 실행할 수 있습니다.
