const jwt = require("jsonwebtoken");

/**
 * JWT 토큰을 검증하여 요청이 인증된 사용자로부터 왔는지 확인하는 미들웨어
 */
module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
