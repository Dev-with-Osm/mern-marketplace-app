const express = require("express");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const dotenv = require("dotenv").config();
const authRouter = require("./routes/authRoute.js");
const dbConnect = require("./config/dbConnect.js");

const app = express();
dbConnect();
const port = process.env.PORT;

app.use(express.json());
app.get("/test", (req, res) => {
  res.send({ message: "Hello World !" });
});

app.use("/api/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, (req, res) => {
  console.log(`Server is running on ${port}`);
});
