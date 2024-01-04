const csv = require("csvtojson");
const Car = require("./../models/carModel");

// const fs = require("fs");
// const databe = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/db.json`));

const checkData = async (req, res, next) => {
  // if (databe.data.length === 0) {
  //   try {
  //     let dataFromCsv = await csv().fromFile(
  //       `${__dirname}/../dev-data/data.csv`
  //     );

  //     databe.data = dataFromCsv;
  //     databe.totalCars = databe.data.length;

  //     fs.writeFileSync(
  //       `${__dirname}/../dev-data/db.json`,
  //       JSON.stringify(databe)
  //     );
  //   } catch (error) {
  //     console.log("Failed to create cars:", error);
  //     return res.status(404).json({
  //       status: "fail",
  //       message: error,
  //     });
  //   }
  // }
  next();
};

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

module.exports = {
  checkData,
  getCars,
  createCar,
  editCar,
  deleteCar,
};
