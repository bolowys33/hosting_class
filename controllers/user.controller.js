const UserModel = require("../models/user.model");

const createUser = async (req, res) => {
  const { username, name, password, email, age } = req.body;

  if (!username || !name || !password || !email) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const newUser = new UserModel({ username, name, password, email, age });
  await newUser.save();

  res
    .status(201)
    .json({ success: true, message: "Account created successfully" });
};

const getUser = async (req, res) => {
  const id = req.user.id

  const user = await UserModel.findById(id).select("name username email");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User with the id not found",
    });
  }

  res.status(200).json({ success: true, data: user });
};

const getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("name username email");

  if (users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No user found",
    });
  }

  res.status(200).json({ success: true, data: users });
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    if (!password || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const user = await UserModel.findOne({ email });

    const isValid = await user.verifyPassword(password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = user.generateToken();

    res
      .status(200)
      .json({ success: true, message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const user = await UserModel.findByIdAndUpdate(id, { name });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }

  res.status(200).json({ success: true, message: "User update successfully" });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  const user = await UserModel.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }

  res.status(200).json({ success: true, message: "User deleted successfully" });
};

module.exports = { createUser, getAllUsers, getUser, login, deleteUser, update };
