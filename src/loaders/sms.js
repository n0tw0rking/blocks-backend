/**
 *  SMS Service configuration 
 */
const {
  config
} = require("../config/index");
const isAuth = require("../api/middlewares/is-auth");
const bodyParser = require("body-parser");
const smsService = require("sails-service-sms");

/**
 * SmS sender Function
 * @param  serviceProvider
 * @param Options Object which has sender < Number >: account owner 's number , provider <Object>: Sid key sting , Token string
 * 
 */

const sendSMS = smsService("twilio", {
  sender: config.sms.sender_num,
  provider: {
    accountSid: config.sms.acc_sid,
    authToken: config.sms.auth_token
  }
});

module.exports = sms = app => {

  app.post(`${config.api.prefix}/sms`, (req, res) => {

    /**
     * Authorizaiton Checking ...
     */

    if (req.isAuth) {
      const {
        reciever,
        text
      } = req.body;

      /**
       * Authorizaiton Checking...
       * isAuthorized  === true  ? 
       * => Send sms
       */

      sendSMS
        .send({
          recipient: [reciever],
          /**
           * example["+21654621974"],
           */
          message: text
        })
        .then(result => {
          console.log(result);
          res.status(200).json({
            success: true,
            result
          });
        })

        /**
         * Authorizaiton Checker
         * isAuthorized  === false  ? 
         * => Send Unathorized message
         */

        .catch(err => {
          console.log(err.negotiate);
          res.json({
            success: false,
            message: err.negotiate
          });
        });
    } else res.json({
      success: false,
      message: "UnAuthorized"
    });
  });
};