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

const getCarListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findListing = await CarListing.findById(id);
    if (!findListing) throw new Error("No Listing Found");
    res.json(findListing);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createCarListing, getCarListing };
