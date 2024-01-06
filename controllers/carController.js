const Car = require("./../models/carModel");
const APIFeatures = require("./../utils/apiFeatures");

const getCars = async (req, res) => {
  try {
    const features = new APIFeatures(Car.find(), req.query).paginate();

    const cars = await features.query;
    const totalCars = await Car.find();
    const totalPages = Math.ceil(totalCars.length / 10);

    res.status(200).json({
      message: "Get Car List Successfully!",
      data: { cars, total: totalPages, page: req.query.page },
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

module.exports = {
  getCars,
  createCar,
  editCar,
  deleteCar,
};
