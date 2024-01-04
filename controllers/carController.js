const fs = require("fs");
const csv = require("csvtojson");

const databe = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/db.json`));

const checkData = async (req, res, next) => {
  if (databe.data.length === 0) {
    try {
      let dataFromCsv = await csv().fromFile(
        `${__dirname}/../dev-data/data.csv`
      );

      databe.data = dataFromCsv;
      databe.totalCars = databe.data.length;

      fs.writeFileSync(
        `${__dirname}/../dev-data/db.json`,
        JSON.stringify(databe)
      );
    } catch (error) {
      console.log("Failed to create cars:", error);
      return res.status(404).json({
        status: "fail",
        message: error,
      });
    }
  }
  next();
};

const getCars = async (req, res) => {
  const { page, limit, search, type = "" } = req.query;
  let limitNumber = limit * 1;
  let pageNumber = page * 1;

  let startIndex = (pageNumber - 1) * limitNumber;
  let endIndex = startIndex + limitNumber;

  try {
    let data = databe.data.slice(startIndex, endIndex);

    if (type) {
      data = databe.data
        .filter((car) =>
          car.types.some((t) =>
            t ? t.toLowerCase() === type.toLowerCase() : false
          )
        )
        .slice(startIndex, endIndex);
    }

    if (search) {
      data = databe.data
        .filter((car) => car.name.toLowerCase().includes(search.toLowerCase()))
        .slice(startIndex, endIndex);
    }

    res.status(200).json({ data });
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid in getAllCars",
    });
  }
};

module.exports = {
  checkData,
  getCars,
};
