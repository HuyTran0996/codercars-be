const express = require("express");
const carControllers = require("./../controllers/carController");

const router = express.Router();

router.route("/").get(carControllers.getCars).post(carControllers.createCar);

router
  .route("/:id")
  .put(carControllers.editCar)
  .delete(carControllers.deleteCar);

module.exports = router;
