const User = require("../models/userModel");
const { hashPassword } = require("../utils/helpers");
/**
 * 사용자 정보를 가져오는 컨트롤러
 */
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(req.token.email);
    
    const user = await User.findByPk(id); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * 새로운 사용자를 생성하는 컨트롤러
 */
exports.createUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    password = await hashPassword(password);
    const newUser = await User.create({ name, email, password });
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: error.message });
  }
};
