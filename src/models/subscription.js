const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Subscription = new Schema({
    name: {
        type: String,
        required: [true, "Please enter a full name"],
        index: true
    },
    balance: {
        type: Schema.Types.ObjectId,
        ref: "Balance"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    block: {
        type: Schema.Types.ObjectId,
        ref: "Block"
    },
    userMesg: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
    service: [
        {
            type: Schema.Types.ObjectId,
            ref: "Service"
        }
    ]
});
module.exports = mongoose.model("Subscription", Subscription);
