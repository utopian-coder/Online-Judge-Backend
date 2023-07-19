const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: ["https://online-judge.vercel.app", "http://localhost:5173"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRouter = require("./routes/userRoutes");
const problemRouter = require("./routes/problemRoutes");

app.use("/api/v1/users", userRouter);
app.use("/api/v1/problems", problemRouter);

module.exports = app;
