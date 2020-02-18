/*
 * Mongoose Loader
 */
const mongoose = require("mongoose");
const {
  config
} = require("../config/index");

/*
 * Asynchronous
 * Mongoose Connector Function
 */

const mongooseConnect = async () => {
  await mongoose
    .connect(config.databaseURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("✌️ DB loaded and connected!");
    });
};

/*
 * Mongoose Export
 */

module.exports = {
  mongooseConnect
};