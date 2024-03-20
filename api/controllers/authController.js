const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
// const validator = require("email-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware.js");
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
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, {
        maxAge: 86400000, // 1 day in milliseconds
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    throw new Error(error);
  }
});

//log in with google
const google = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ _id: user?._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          maxAge: 86400000, // 1 day in milliseconds
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generateMobileNumber = Math.random().toString().slice(2);

      // Extract the last 10 digits
      const last10Digits = generateMobileNumber.slice(-10);

      console.log(last10Digits);
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        fullName:
          req.body.fullName.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        avatar: req.body.avatar,
        password: hashedPassword,
        mobile: last10Digits,
      });
      await newUser.save();
      const token = jwt.sign(
        { _id: newUser?._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, {
          maxAge: 86400000, // 1 day in milliseconds
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    throw new Error(error);
  }
});

//logout user
const logOutUser = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("access_token").json("User LoggedOut");
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createNewUser, loginUser, logOutUser, google };
