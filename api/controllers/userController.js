const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const verifyMongoDbId = require("../utils/verifyMongoDbId.js");
const bcrypt = require("bcrypt");

//update user
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  verifyMongoDbId(_id);
  try {
    const hashedPass = bcrypt.hashSync(password, 10);
    const newUser = await User.findByIdAndUpdate(
      _id,
      { ...req.body, password: hashedPass },
      { new: true }
    );
    res.json(newUser);
  } catch (error) {
    throw new Error(error);
  }
});

//delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  verifyMongoDbId(_id);
  try {
    const deletedUser = await User.findByIdAndDelete(_id);
    res.json(deletedUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { updateUser, deleteUser };
