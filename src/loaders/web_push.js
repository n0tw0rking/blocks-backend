/**
 * 
 * WEB Push Notification Worker
 */

// const bodyParser = require("body-parser");
const isAuth = require("../api/middlewares/is-auth");
const {
  config
} = require("../config/index");
const webpush = require("web-push");
const PushNotif = require("../models/pushNotification");

module.exports = pushNotif = app => {
  app.post("/push", async (req, res) => {

    /**
     * Authorizaiton Checking ...
     */
    if (req.isAuth) {
      const sub = req.body;
      const push = new PushNotif({
        userId: req.userId,
        subNotif: sub
      });
      try {
        await push.save();
      } catch (err) {
        console.log(err, "something is wrong mohamed ");
      }

      res.set("Content-Type", "application/json");

      webpush.setVapidDetails(
        "blocks:Notworking@gmail.com",
        config.webPush.public_key,
        config.webPush.private_key
      );

      const payload = JSON.stringify({
        notification: {
          title: "UNI-BLoCK",
          body: "Thank you everything ",
          icon: "https://lh3.googleusercontent.com/proxy/jvefvnD85Iszy5iybynbTaCHx-ZUd7QeVJ-m3jYIdy6ST3uTrBE88ZpvLqLEKmeDoXrWZK7yuM6zw8Wse30_AgyQhMrvyePbo5FMIYqLzAJysjXYcipckAJoNx3GvwJ9xRt_5g"
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
    } else res.json({
      success: false,
      message: "unAuthorized"
    });
  });
};