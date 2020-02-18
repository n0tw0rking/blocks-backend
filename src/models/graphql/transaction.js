/**
 *  Transaction Model 
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Transaction = new Schema({
  subscribtion: {
    type: Schema.Types.ObjectId,
    ref: "Subscribtion"
  },
  type
});
module.exports = mongoose.model("Transaction", Transaction);