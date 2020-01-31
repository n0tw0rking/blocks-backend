const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const schema = new Schema({
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isSuperAdmin: {
    type: Boolean,
    default: false
  },
  userMesg: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message"
    }
  ],
  userSubscription: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subscription"
    }
  ],
  adminBlock: [
    {
      type: Schema.Types.ObjectId,
      ref: "Block"
    }
  ]
});

module.exports = mongoose.model("User", schema);
