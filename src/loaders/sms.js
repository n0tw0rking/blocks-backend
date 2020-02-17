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
 * @param Options Object which has sender < Number >: account owner 's number , provider <Object>: Sid key , Token
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
    if (req.isAuth) {
      const {
        reciever,
        text
      } = req.body;
      console.log(reciever, text);
      sendSMS
        .send({
          recipient: [reciever],
          //   ["+21654621974"],
          message: text
        })
        .then(result => {
          console.log(result);
          res.status(200).json({
            success: true,
            result
          });
        })
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