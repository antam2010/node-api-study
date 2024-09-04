// src/models/userModel.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // Sequelize 인스턴스를 가져옵니다.

/**
 * 사용자 모델을 정의합니다.
 */
const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // 필수 값
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // 고유 값
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // 필수 값
    },
  },
  {
    timestamps: true, // createdAt 및 updatedAt 필드를 자동으로 추가합니다.
  }
);

module.exports = User;
