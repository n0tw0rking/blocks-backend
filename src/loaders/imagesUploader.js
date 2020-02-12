const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const isAuth = require("../api/middlewares/is-auth");
const bodyParser = require("body-parser");
const { config } = require("../config/index");

cloudinary.config({
  cloud_name: config.image.cloud_name,
  api_key: config.image.api_key,
  api_secret: config.image.api_secret
});
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "gavatar",
  allowedFormats: ["jpg", "jpeg", "png"],
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
  app.use(isAuth);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/api/images", parser.single("file"), (req, res) => {
    if (req.isAuth) {
      const image = {};
      image.url = req.file.url;
      image.id = req.file.public_id;
      res.status(200).json({
        image
      });
    } else res.json({ success: false, message: "unAuthorized" });
  });
  app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });
};
