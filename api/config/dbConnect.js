const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err);
  }
};

module.exports = dbConnect;
