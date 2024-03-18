const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
// const validator = require("email-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);

// sign up user func
const createNewUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // TODO : validate email
    // if (!validator.validate(email)) throw new Error("Invalid Email Address!");
    const existedUser = await User.findOne({ email });
    if (existedUser) throw new Error("User Already exist");
    const hashedPassword = bcrypt.hashSync(password, salt);
    // console.log(hashedPassword);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.json(newUser);
  } catch (error) {
    throw new Error(error);
  }
});

//login func
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }
    const token = jwt.sign({ _id: user?._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res
      .cookie("token", token, {
        maxAge: 86400000, // 1 day in milliseconds
        httpOnly: true,
      })
      .json({
        _id: user._id,
        email: user.email,
      });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createNewUser, loginUser };
