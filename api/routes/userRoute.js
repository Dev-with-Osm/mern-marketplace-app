const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const { updateUser, deleteUser } = require("../controllers/userController.js");

const router = express.Router();

router.put("/update/:id", authMiddleware, updateUser);
router.delete("/", authMiddleware, deleteUser);

module.exports = router;
