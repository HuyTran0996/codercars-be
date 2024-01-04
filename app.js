const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const carRouter = require("./routes/carRoutes");

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/cars", carRouter);

module.exports = app;
