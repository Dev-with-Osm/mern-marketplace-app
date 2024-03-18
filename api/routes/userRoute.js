const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const { updateUser } = require("../controllers/userController.js");

const router = express.Router();

router.put("/update", authMiddleware, updateUser);

module.exports = router;
