const dotenv = require("dotenv");
const app = require("./app");
const { connectDB } = require("./config/db");

dotenv.config();

// PostgreSQL 데이터베이스와 연결합니다.
connectDB();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
