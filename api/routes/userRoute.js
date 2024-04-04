const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
  updateUser,
  deleteUser,
  getUserById,
  getUserListings,
} = require("../controllers/userController.js");

const router = express.Router();

router.get("/getuser/:id", getUserById);
router.get("/getlisting/:id", authMiddleware, getUserListings);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete/:id", authMiddleware, deleteUser);

module.exports = router;
