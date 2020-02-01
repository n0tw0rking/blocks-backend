const mongoose = require("mongoose");
const { config } = require("../config/index");

const mongooseConnect = async () => {
    await mongoose
        .connect(
            // config.databaseURL
            "mongodb://localhost:27017/appEvent",
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            }
        )
        .then(() => {
            console.log(" DB loaded and connected!");
        })
        .catch((error) => console.log(error));
};
module.exports = {
    mongooseConnect
};
