/**
 * Image Uplading Service configuration
 */
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const isAuth = require("../api/middlewares/is-auth");
const {
  config
} = require("../config/index");

/**
 * Cloudinary Config
 * @param  cloud_name name of the cloud
 * @param api_key api key string
 * @param api_secret api secret string
 */
cloudinary.config({
  cloud_name: config.image.cloud_name,
  api_key: config.image.api_key,
  api_secret: config.image.api_secret
});

/**
 * storage config
 * @param cloudinary cloudinary configuration
 * @param folder name of the folder that will be created on the cloud
 * @param allowedFormats array of allowed formats to be uploaded
 * @param transformation array of object that has the crop dimentions
 */
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "gavatar",
  allowedFormats: ["jpg", "jpeg", "png"],
  transformation: [{
    width: 500,
    height: 500,
    crop: "limit"
  }]
});

/**
 * Multer Middleware parser
 */
const parser = multer({
  storage: storage
});
module.exports = image = app => {
  app.use(`${config.api.prefix}/images`, parser.single("file"), (req, res) => {

    /**
     * Authorizaiton Checking ...
     */
    if (req.isAuth) {

      /**
       * Authorizaiton Checking...
       * isAuthorized  === true  ? 
       * => upload image
       */

      const image = {};
      image.url = req.file.url;
      image.id = req.file.public_id;
      res.status(200).json({
        image
      });
    } else res.json({
      success: false,
      message: "unAuthorized"
    });
  });

  /**
   * Response Error Handling
   */
  app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });
};