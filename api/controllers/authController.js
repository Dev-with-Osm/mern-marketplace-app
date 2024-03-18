const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
// const validator = require("email-validator");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

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

module.exports = { createNewUser };
