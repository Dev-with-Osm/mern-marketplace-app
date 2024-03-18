const express = require("express");
const {
  createNewUser,
  loginUser,
  updateUser,
} = require("../controllers/authController.js");
// const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/register", createNewUser);
router.post("/login", loginUser);

module.exports = router;
