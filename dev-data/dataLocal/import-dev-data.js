const fs = require("fs");
const csv = require("csvtojson");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Car = require("./../../models/carModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

const databe = JSON.parse(fs.readFileSync(`${__dirname}/db.json`, "utf-8"));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    let dataFromCsv = await csv().fromFile(`${__dirname}/data.csv`);
    dataFromCsv = await dataFromCsv.map((e, index) => {
      return {
        make: e["Make"],
        model: e["Model"],
        release_date: e["Year"],
        transmission_type: e["Transmission Type"],
        size: e["Vehicle Size"],
        style: e["Vehicle Style"],
        price: e["MSRP"],
      };
    });

    //json backup file
    // databe.cars = dataFromCsv;
    // databe.totalCars = databe.cars.length;
    // fs.writeFileSync(`${__dirname}/db.json`, JSON.stringify(databe));

    // await Car.create(dataFromCsv);
    await Car.create(databe.cars);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Car.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
