const User = require("../models/userModel.js");
const Listing = require("../models/carListingModel.js");
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
});

//delete user
const deleteUser = asyncHandler(async (req, res) => {
  if (req.user._id !== req.params.id) {
    throw new Error("You can only delete your own account");
  }
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    throw new Error(error);
  }
});

//get user listings
const getUserListings = asyncHandler(async (req, res) => {
  console.log(req.user);
  if (req.user._id != req.params.id) {
    throw new Error("Something Wrong!");
  }
  try {
    const listings = await Listing.find({ userRef: req.params.id });
    res.json(listings);
  } catch (error) {
    throw new Error(error);
  }
});

// get single user by id
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findUser = await User.findById(id);
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { updateUser, deleteUser, getUserById, getUserListings };
