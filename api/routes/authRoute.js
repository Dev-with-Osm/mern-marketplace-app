const express = require("express");
const {
  createNewUser,
  loginUser,
  logOutUser,
  google,
} = require("../controllers/authController.js");
// const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/register", createNewUser);
router.post("/login", loginUser);
router.post("/google", google);
router.get("/logout", logOutUser);

module.exports = router;
