const dotenv = require("dotenv");
dotenv.config({
  path: process.env.NODE_ENV === "development" ? ".env.develop" : ".env",
});
const app = require("./app");
const { connectDB } = require("./config/db");

// PostgreSQL 데이터베이스와 연결합니다.
connectDB();

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

app.listen(port, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
  console.log(`Swagger docs available at http://${hostname}:${port}/api-docs`);
});
