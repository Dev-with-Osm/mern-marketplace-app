const asyncHandler = require("express-async-handler");
const CarListing = require("../models/carListingModel.js");

const createCarListing = asyncHandler(async (req, res) => {
  try {
    const carlisting = await CarListing.create(req.body);
    res.json(carlisting);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createCarListing };
