const express = require("express");
const { createNewUser } = require("../controllers/authController.js");

const router = express.Router();

router.post("/register", createNewUser); // Provide the callback function createNewUser

module.exports = router;
