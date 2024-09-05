const User = require("../models/userModel");
const { hashPassword } = require("../utils/helpers");

/**
 * 유저 정보의 응답 형식
 * @param {object} user - 사용자 객체
 * @returns {object} - 응답에 사용할 사용자 정보
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
 * 내 정보 출력 (사용자 정보 가져오기)
 * @route GET /api/users/:id
 * @param {object} req - 요청 객체
 * @param {object} res - 응답 객체
 * @returns {object} - 사용자 정보
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
 * 유저 생성 (새 사용자 등록)
 * @route POST /api/users
 * @param {object} req - 요청 객체
 * @param {object} res - 응답 객체
 * @returns {object} - 생성된 사용자 정보
 */
exports.createUser = async (req, res) => {
  try {
    let { name, email, password, grade } = req.body;
    password = await hashPassword(password); // 비밀번호 해싱
    const newUser = await User.create({ name, email, password, grade });
    res.status(201).json(resUser(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * 내 정보 수정 (사용자 정보 업데이트)
 * @route PUT /api/users/:id
 * @param {object} req - 요청 객체
 * @param {object} res - 응답 객체
 * @returns {object} - 업데이트된 사용자 정보
 */
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, email, password, grade } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password) password = await hashPassword(password); // 비밀번호가 있으면 해싱

    // 사용자 정보 업데이트
    await user.update({ name, email, password, grade });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * 회원 탈퇴 (소프트 삭제)
 * @route DELETE /api/users/:id
 * @param {object} req - 요청 객체
 * @param {object} res - 응답 객체
 * @returns {object} - 삭제 성공 메시지
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
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this user" });
    }

    // 소프트 삭제: deletedAt 필드에 시간 기록
    await user.destroy();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * 회원 복구 (소프트 삭제된 사용자 복원)
 * @route PUT /api/users/:id/restore
 * @param {object} req - 요청 객체
 * @param {object} res - 응답 객체
 * @returns {object} - 복구 성공 메시지
 */
exports.restoreUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      paranoid: false, // 삭제된 레코드도 조회 가능하게 설정
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 권한 체크 (필요한 경우)
    if (req.token.email != user.email) {
      return res
        .status(403)
        .json({ message: "You do not have permission to restore this user" });
    }

    // 사용자 복구: deletedAt 필드를 null로 설정
    await user.restore();

    res.json({ message: "User restored successfully" });
  } catch (error) {
    console.error("Error restoring user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
