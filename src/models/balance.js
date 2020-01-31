const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Balance = new Schema({
  value: {
    type: Number,
    require: true
  }
});

module.exports = mongoose.model("Balance", Balance);
