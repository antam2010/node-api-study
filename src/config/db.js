// src/config/db.js
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

// .env 파일에서 환경 변수를 로드합니다.
dotenv.config();

// PostgreSQL 데이터베이스와의 연결을 설정합니다.
const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: "postgres",
  logging: false, // 로깅을 비활성화하려면 false로 설정합니다.
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected");
    await sequelize.sync(); // 모든 모델의 테이블이 자동으로 생성됩니다.
  } catch (error) {
    console.error("PostgreSQL connection error:", error);
    process.exit(1); // 연결 실패 시 종료합니다.
  }
};

module.exports = {
  sequelize,
  connectDB,
};
