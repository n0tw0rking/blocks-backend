const mongoose = require("mongoose");
const { config } = require("../config/index");

const mongooseConnect = async () => {
  await mongoose
    .connect(config.databaseURL, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => {
      console.log("✌️ DB loaded and connected!");
    });
};
module.exports = {
  mongooseConnect
};
