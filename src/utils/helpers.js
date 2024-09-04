// src/utils/helpers.js
const bcrypt = require("bcrypt");

/**
 * 비밀번호를 해싱하는 유틸리티 함수
 * @param {string} password - 평문 비밀번호
 * @returns {Promise<string>} - 해싱된 비밀번호
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * 해싱된 비밀번호와 입력된 비밀번호를 비교하는 유틸리티 함수
 * @param {string} password - 평문 비밀번호
 * @param {string} hashedPassword - 해싱된 비밀번호
 * @returns {Promise<boolean>} - 비밀번호 일치 여부
 */
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
