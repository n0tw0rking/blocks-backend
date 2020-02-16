const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Push = new Schema({
    subNotif: {
        type: {}
    },
    userId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("PushNotif", Push);
