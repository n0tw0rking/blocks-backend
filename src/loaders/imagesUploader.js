const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const isAuth = require("../api/middlewares/is-auth");
const bodyParser = require("body-parser");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "gavatar",
  allowedFormats: ["jpg", "jpeg", "png", "mp4", "mkv"],
  transformation: [
    {
      width: 500,
      height: 500,
      crop: "limit"
    }
  ]
});
var parser = multer({
  storage: storage
});
module.exports = image = app => {
  //   app.use(auth);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/api/images", parser.single("file"), (req, res) => {
    const image = {};
    image.url = req.file.url;
    image.id = req.file.public_id;
    res.json({
      image
    });
  });
  app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });
};
