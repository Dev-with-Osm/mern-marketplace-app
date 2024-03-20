const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const verifyMongoDbId = require("../utils/verifyMongoDbId.js");
const bcrypt = require("bcrypt");

//update user
const updateUser = asyncHandler(async (req, res) => {
  if (req.user._id != req.params.id) {
    throw new Error("You can only update your own account");
  }
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          fullName: req.body.fullName,
          email: req.body.email,
          mobile: req.body.mobile,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.json(rest);
  } catch (error) {
    throw new Error(error);
  }

  // ! updated code
  // // const { _id } = req.user;
  // const { id } = req.params;
  // const { password } = req.body;
  // // verifyMongoDbId(_id);
  // try {
  //   const hashedPass = bcrypt.hashSync(password, 10);
  //   const newUser = await User.findByIdAndUpdate(
  //     id,
  //     { ...req.body, password: hashedPass },
  //     { new: true }
  //   );
  //   res.json(newUser);
  // } catch (error) {
  //   throw new Error(error);
  // }
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
