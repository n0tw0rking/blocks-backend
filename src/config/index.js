const dotenv = require("dotenv");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

/**
 * If .ENV file is missing comment
 */

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * Database Connection URI
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * Secret Sauce
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "silly"
  },
  /**
   * API configs
   */
  api: {
    prefix: "/api"
  },
  /**
   *  WEB Push Notifcation Credentials
   */
  webPush: {
    public_key: process.env.PUBLIC_KEY,
    private_key: process.env.PRIVATE_KEY
  },
  /**
   *  Email Credentials
   */
  email: {
    password: process.env.GMAIL_PASSWORD,
    sender: process.env.GMAIL_SENDER
  },
  /**
   *  sms Credentials
   */
  sms: {
    acc_sid: process.env.ACC_SID,
    auth_token: process.env.AUTH_TOKEN,
    sender_num: process.env.SENDER_NUM
  },
  /**
   *  cloudnary credentials
   */
  image: {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  }
};
module.exports = {
  config
};