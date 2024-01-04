const express = require("express");
const carControllers = require("./../controllers/carController");

const router = express.Router();

// router.param("id", carControllers.checkID);

router.route("/").get(carControllers.checkData, carControllers.getCars);
// .post(carControllers.checkBody, carControllers.addCar);

// router
//   .route("/:id")
//   .get(carControllers.checkData, carControllers.getCarById)
//   .put(carControllers.checkBodyEdit, carControllers.editCar)
//   .delete(carControllers.deleteCar);

module.exports = router;
