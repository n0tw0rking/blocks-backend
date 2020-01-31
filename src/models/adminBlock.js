const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const AdminBlock = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  block: {
    type: Schema.Types.ObjectId,
    ref: "Block"
  }
});
module.exports = mongoose.model("AdminBlock", AdminBlock);
