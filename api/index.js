const express = require("express");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const dotenv = require("dotenv").config();
const authRouter = require("./routes/authRoute.js");
const userRouter = require("./routes/userRoute.js");
const dbConnect = require("./config/dbConnect.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
dbConnect();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, (req, res) => {
  console.log(`Server is running on ${port}`);
});
