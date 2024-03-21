const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    location: {
      type: String,
    },
    features: {
      type: String,
    },
    images: {
      type: [],
    },
    color: {
      type: String,
    },
    fuelType: {
      type: String,
    },
    transmission: {
      type: String,
    },
    mileage: {
      type: Number,
    },
    year: {
      type: Number,
      required: true,
    },
    bodyType: {
      type: String,
    },
    additionalNotes: {
      type: String,
    },
    model: {
      type: Number,
      required: true,
    },
    engineType: {
      type: String,
      required: true,
    },
    performanceMetrics: {
      type: String,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Car", carSchema);
