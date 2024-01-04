const express = require("express");
const carControllers = require("./../controllers/carController");

const router = express.Router();

router
  .route("/")
  .get(carControllers.checkData, carControllers.getCars)
  .post(carControllers.createCar);

router
  .route("/:id")
  .put(carControllers.checkData, carControllers.editCar)
  .delete(carControllers.deleteCar);

module.exports = router;
