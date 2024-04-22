require("dotenv").config();
require("express-async-errors");

// extra security packages
const cors = require("cors");

//Express
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const authenticateUser = require("./middleware/authentication");
// routers
const authRouter = require("./routes/auth");
const getRouter = require("./routes/get");
const commonRouter = require("./routes/common");
const createRouter = require("./routes/create");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/get", authenticateUser, getRouter);
app.use("/api/v1", authenticateUser, commonRouter);
app.use("/api/v1", authenticateUser, createRouter);

//middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/KIT");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
