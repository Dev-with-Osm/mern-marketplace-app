const express = require("express");
const {
  createCarListing,
  getCarListing,
} = require("../controllers/carListingController");

const router = express.Router();
router.post("/create", createCarListing);
router.get("/:id", getCarListing);

module.exports = router;
