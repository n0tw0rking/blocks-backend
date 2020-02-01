const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Block = new Schema({
  name: {
    type: String,
    require: true
  },
  location: {
    type: String
  },
  userSubscription: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subscription"
    }
  ],
  blockAdmin: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Block", Block);
