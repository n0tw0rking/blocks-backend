const dotenv = require("dotenv");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

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
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * secret sauce
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
   *  web push credentials
   */
  webPush: {
    public_key: process.env.PUBLIC_KEY,
    private_key: process.env.PRIVATE_KEY
  },
  /**
   *  email credentials
   */
  email: {
    password: process.env.GMAIL_PASSWORD,
    sender: process.env.GMAIL_SENDER
  },
  /**
   *  sms credentials
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
