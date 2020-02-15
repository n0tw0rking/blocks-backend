const mongoose = require("mongoose");
const { config } = require("../config/index");

const mongooseConnect = async () => {
<<<<<<< HEAD
  await mongoose
    .connect(config.databaseURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("✌️ DB loaded and connected!");
    });
};
// const mongooseConnect = async () => {
//     await mongoose
//         .connect(
//             "mongodb://localhost:27017/appEvent"
//             , {
=======
    await mongoose
        .connect(config.databaseURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("✌️ DB loaded and connected!");
        });
};
// const mongooseConnect = async () => {
//     await mongoose
//         .connect("mongodb://localhost:27017/appEvent", {
>>>>>>> 9861fbc59252d37eac6bb27216eb80925334d284
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             useUnifiedTopology: true
//         })
//         .then(() => {
//             console.log("✌️ DB loaded and connected!");
//         });
// };

module.exports = {
  mongooseConnect
};
