/**
 * Mail Service configuration
 */
const {
  config
} = require("../config/index");
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
  /*
   * Secutity
   * Authentication Middleware
   */
  app.use(isAuth);

  app.post(`${config.api.prefix}/email`, (req, res) => {
    /**
     * Checking Authorizaiton
     */
    if (req.isAuth) {
      const {
        email,
        text
      } = req.body;
      sendEmail(email, text)
        .then(({
          result
        }) => {
          console.log("message sent", result);
          res.status(200).json({
            success: true,
            result
          });
        })
        .catch(err => {
          console.log(err);
          res.json({
            success: false,
            message: err
          });
        });
    } else res.json({
      success: false,
      message: "UnAuthorized"
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