require("dotenv").config();
const isAuth = require("../api/middlewares/is-auth");
const bodyParser = require("body-parser");
const SmsService = require("sails-service-sms");
// console.log()
const sendSMS = SmsService("twilio", {
  sender: process.env.SENDER_NUM,
  provider: {
    accountSid: process.env.ACC_SID,
    authToken: process.env.AUTH_TOKEN
  }
});
module.exports = sms = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(isAuth);
  app.post("/api/sms", (req, res) => {
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
          res.json({ success: true, result });
        })
        .catch(err => {
          console.log(err.negotiate);
          res.json({ success: false, message: err.negotiate });
        });
    } else res.json({ success: false, message: "UnAuthorized" });
  });
};
