const User = require("../models/userModel");
const { hashPassword } = require("../utils/helpers");

/**
 * 결과 값 (유저)
 * @param {object} user
 * @returns
 */
const resUser = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    grade: user.grade,
  };
};

/**
 * 내 정보 출력
 */
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(resUser(user));
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * 유저 생성
 */
exports.createUser = async (req, res) => {
  try {
    let { name, email, password, grade } = req.body;
    password = await hashPassword(password);
    const newUser = await User.create({ name, email, password, grade });
    res.status(201).json(resUser(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * 내 정보 수정
 */
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, email, password, grade } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password) password = await hashPassword(password);

    // 사용자 정보 업데이트
    await user.update({ name, email, password, grade });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * 회원 탈퇴
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 권한 체크 (필요한 경우)
    if (req.token.email != user.email) {
        return res.status(403).json({ message: "You do not have permission to delete this user" });
    }

    // 소프트 삭제: deletedAt 필드에 시간 기록
    await user.destroy();

    res.json({ message: "User deleted successfully" });
    
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
