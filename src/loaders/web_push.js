const bodyParser = require("body-parser");
const isAuth = require("../api/middlewares/is-auth");
const { config } = require("../config/index");
const webpush = require("web-push");

/*
This is the push notification web worker 
*/
module.exports = notpush = app => {
  app.use(bodyParser.json());
  app.use(isAuth);
  app.post("/push", (req, res) => {
    if (req.isAuth) {
      const sub = req.body;
      console.log(sub);
      res.set("Content-Type", "application/json");

      webpush.setVapidDetails(
        "blocks:Notworking@gmail.com",
        config.webPush.public_key,
        config.webPush.private_key
      );

      const payload = JSON.stringify({
        notification: {
          title: "UNI-BLoCK",
          body: "thank you weeeha for everything ",
          icon:
            "https://lh3.googleusercontent.com/proxy/jvefvnD85Iszy5iybynbTaCHx-ZUd7QeVJ-m3jYIdy6ST3uTrBE88ZpvLqLEKmeDoXrWZK7yuM6zw8Wse30_AgyQhMrvyePbo5FMIYqLzAJysjXYcipckAJoNx3GvwJ9xRt_5g"
        }
      });
      Promise.resolve(webpush.sendNotification(sub, payload))
        .then(() => {
          res.status(200).json({
            message: "Notification Sent"
          });
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    } else res.json({ success: false, message: "unAuthorized" });
  });
};
