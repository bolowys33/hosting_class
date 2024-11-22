const mongoose = require("mongoose");
const argon = require("argon2");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Basic email regex pattern
  },
  password: {
    type: String,
    required: true,
    match:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  },
  age: {
    type: Number,
    required: false,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    user.password = await argon.hash(user.password);

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.verifyPassword = async function (password) {
  const user = this;
  try {
    return await argon.verify(user.password, password);
  } catch (error) {
    throw new Error("Password verification failed");
  }
};

userSchema.methods.generateToken = function () {
  const user = this;

  const payload = { id: user._id, username: user.username };
  const secretKey = process.env.JWT_SECRET;
  const options = { expiresIn: process.env.JWT_EXPIRES };

  const token = jwt.sign(payload, secretKey, options);

  return token;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
