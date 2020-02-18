const {
  config
} = require("./config");
const express = require("express");
const graphql = require("./loaders/graphql");
const sms = require("./loaders/sms");
const email = require("./loaders/mailer");
const image = require("./loaders/imagesUploader");
const pushNotif = require("./loaders/web_push");
const cors = require("cors");
const bodyParser = require("body-parser");
const isAuth = require("./api/middlewares/is-auth")
/**
 * Asynchronous
 * Server Starter Function
 */
async function startServer() {

  /**
   * Express Server
   */

  const app = express();

  /**
   * Security
   * Cross Origin Resourse Sharing
   */

  app.use(cors());

  /**
   * Middleware
   * Parsing Incoming and Outcoming Header Body
   */

  app.use(bodyParser.json());

  app.use(isAuth)
  /**
   * Utility
   * SMS service 
   */

  sms(app);

  /**
   * Utility
   * Email service 
   */

  email(app);

  /**
   * Utility
   * Image Uplading Service 
   */

  image(app);

  /**
   * Utilty
   * Push Notification Service
   */

  pushNotif(app);

  /**
   * Loader
   * GraphQl interface
   */

  graphql(app);

  /**
   * Mongoose Loader
   * Waiting Database to load to intialize
   */

  await require("./loaders/mongoose").mongooseConnect();
  app.listen(config.port, err => {
    if (err) {
      console.Error(err);
      process.exit(1);
      return;
    }
    console.log(`
      ################################################
           🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
}
startServer();

/**
 * NOTE:
 * Server Starter is exported for Testing
 */

module.exports = {
  startServer
};