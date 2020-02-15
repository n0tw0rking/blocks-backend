const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Push = new Schema({
    subNotif: {
        type: {}
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("PushNotif", Push);
