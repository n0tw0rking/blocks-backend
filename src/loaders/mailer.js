require("dotenv").config();
const isAuth = require("../api/middlewares/is-auth");
const bodyParser = require("body-parser");
const send = require("gmail-send")({
  user: process.env.gmail_sender,
  pass: process.env.gmail_password
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
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.post("/api/email", (req, res) => {
    const { email, text } = req.body;
    sendEmail(email, text)
      .then(({ result }) => {
        console.log("message sent", result);
        res.json({ success: true, result });
      })
      .catch(err => {
        console.log(err);
        res.json({ success: false, message: err });
      });
  });
};
