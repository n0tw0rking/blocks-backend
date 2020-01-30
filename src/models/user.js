const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a full name"],
      index: true
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true
    },

    password: String,

    salt: String,
    role: {
      type: String,
      default: "user"
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isUser: {
      type: Boolean,
      default: true
    },
    isSuperAdmin: {
      type: Boolean,
      default: false
    },
    adminBlock: [
      {
        type: Schema.Types.ObjectId,
        ref: "Block"
      }
    ]
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", User);
