const { config } = require("../config/index");
const isAuth = require("../api/middlewares/is-auth");
const bodyParser = require("body-parser");
const SmsService = require("sails-service-sms");
const sendSMS = SmsService("twilio", {
  sender: config.sms.sender_num,
  provider: {
    accountSid: config.sms.acc_sid,
    authToken: config.sms.auth_token
  }
});
module.exports = sms = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(isAuth);
  app.post(`/${config.api}/sms`, (req, res) => {
    if (req.isAuth) {
      const { reciever, text } = req.body;
      console.log(reciever, text);
      sendSMS
        .send({
          recipient: [reciever],
          //   ["+21654621974"],
          message: text
        })
        .then(result => {
          console.log(result);
          res.status(200).json({ success: true, result });
        })
        .catch(err => {
          console.log(err.negotiate);
          res.json({ success: false, message: err.negotiate });
        });
    } else res.json({ success: false, message: "UnAuthorized" });
  });
};
