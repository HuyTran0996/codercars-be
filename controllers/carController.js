const { query } = require("express");
const Car = require("./../models/carModel");

const getCars = async (req, res) => {
  try {
    const cars = await Car.find();

    res.status(200).json({
      message: "Get Car List Successfully!",
      cars: cars,
      page: "chua lam",
      total: "chua lam total pages",
      totalcars: cars.length,
    });
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid in getAllCars",
    });
  }
};

const createCar = async (req, res) => {
  try {
    const newCar = await Car.create(req.body);

    res.status(201).json({
      message: "Create Car Successfully!",
      car: newCar,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const editCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Update Car Successfully!",
      car,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);

    res.status(204).json({
      message: "Delete Car Successfully!",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const page = req.query.page * 1 || 1;
const limit = req.query.limit * 1 || 10;
const skip = (page - 1) * limit;
query = query.skip(skip).limit(limit);
const cars = await query;
module.exports = {
  getCars,
  createCar,
  editCar,
  deleteCar,
};
