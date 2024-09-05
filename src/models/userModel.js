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
      comment: "사용자의 이름",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // 고유 값
      comment: "사용자의 이메일",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // 필수 값
      comment: "사용자의 비밀번호",
    },
    grade: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "사용자 등급",
    },
  },
  {
    tableName: "users",
    timestamps: true, // createdAt 및 updatedAt 필드를 자동으로 추가
    paranoid: true, // deletedAt 필드를 자동으로 추가하고 소프트 삭제 활성화
    comment: "사용자 테이블",
  }
);

module.exports = User;
