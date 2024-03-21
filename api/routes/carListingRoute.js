const express = require("express");
const { createCarListing } = require("../controllers/carListingController");

const router = express.Router();
router.post("/create", createCarListing);

module.exports = router;
