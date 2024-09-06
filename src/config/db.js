// src/config/db.js
const { Sequelize } = require("sequelize");

// PostgreSQL 데이터베이스와의 연결을 설정합니다.
const sequelize = new Sequelize(
  process.env.DB_NAME, // 데이터베이스 이름
  process.env.DB_USERNAME, // 사용자 이름
  process.env.DB_PASSWORD, // 비밀번호
  {
    host: process.env.DB_HOST, // 호스트
    port: process.env.DB_PORT, // 포트
    dialect: "postgres", // 사용할 데이터베이스의 종류
    logging: console.log, // 로깅을 비활성화하려면 false로 설정, console.log
  }
);

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
