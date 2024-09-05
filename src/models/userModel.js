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
      comment: "사용자의 이름", // DB에 남길 주석
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // 고유 값
      comment: "사용자의 이메일", // DB에 남길 주석
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // 필수 값
      comment: "사용자의 비밀번호", // DB에 남길 주석
    },
    grade: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0, // 기본값을 0으로 설정
      comment: "사용자 등급", // DB에 남길 주석
    },
  },
  {
    timestamps: true, // createdAt 및 updatedAt 필드를 자동으로 추가합니다.
    comment: "사용자 테이블", // 테이블에 대한 주석
  }
);

module.exports = User;
