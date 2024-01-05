const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, "A car must have a maker"],
    unique: false,
  },
  model: {
    type: String,
    required: [true, "A car must have a model"],
    unique: false,
  },
  release_date: {
    type: Number,
    required: [true, "A car must have a release_date"],
    unique: false,
  },
  transmission_type: {
    type: String,
    required: [true, "A car must have a transmission_type"],
    unique: false,
  },
  size: {
    type: String,
    required: [true, "A car must have a size"],
    unique: false,
  },
  style: {
    type: String,
    required: [true, "A car must have a style"],
    unique: false,
  },
  price: {
    type: Number,
    required: [true, "A car must have a price"],
    unique: false,
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
