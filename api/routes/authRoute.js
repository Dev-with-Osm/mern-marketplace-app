const express = require("express");
const {
  createNewUser,
  loginUser,
  logOutUser,
} = require("../controllers/authController.js");
// const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/register", createNewUser);
router.post("/login", loginUser);
router.get("/logout", logOutUser);

module.exports = router;
