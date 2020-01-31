const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Invoice = new Schema({
  subscribtion: {
    type: Schema.Types.ObjectId,
    ref: "Subscribtion"
  },
  transaction: {
    type: Schema.Types.ObjectId,
    ref: "Transaction"
  }
});
module.exports = mongoose.model("Invoice", Invoice);
