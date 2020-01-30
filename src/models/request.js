const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Request = new Schema({
  username: {
    type: String,
    required: ["Please Enter a username", true]
  },
  password: {
    type: String,
    required: ["Please Enter a password", true]
  },
  verifyCode: {
    type: String,
    required: ["Please Enter a password", true]
  },
  email: {
    type: String,
    required: ["Please Enter an email", true]
  }
});
module.exports = mongoose.model("Request", Request);
