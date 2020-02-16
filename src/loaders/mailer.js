const { config } = require("../config/index");
const isAuth = require("../api/middlewares/is-auth");
const bodyParser = require("body-parser");
const send = require("gmail-send")({
  user: config.email.sender,
  pass: config.email.password
});
function sendEmail(
  to,
  // username,
  text
) {
  // check the email before before sending
  var msg = {
    to: `${to}`,
    subject: "test messge",
    text: `${text}`,
    html: `
            <div><h1>${text}</h1><br/>
            <strong><h2>Thanks for the hard effort you give</h2></strong><br/>
            <h5>This is your test meassage :</h5><br/>
            </div>`
  };
  return send(msg);
}
module.exports = email = app => {
  app.use(isAuth);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.post(`/${config.api}/email`, (req, res) => {
    if (req.isAuth) {
      const { email, text } = req.body;
      sendEmail(email, text)
        .then(({ result }) => {
          console.log("message sent", result);
          res.status(200).json({ success: true, result });
        })
        .catch(err => {
          console.log(err);
          res.json({ success: false, message: err });
        });
    } else res.json({ success: false, message: "UnAuthorized" });
  });
};
