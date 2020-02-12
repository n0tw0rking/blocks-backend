const { config } = require("./config");
const express = require("express");
const graphql = require("./loaders/graphql");
const sms = require("./loaders/sms");
const email = require("./loaders/mailer");
const image = require("./loaders/imagesUploader");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const cors = require("cors");

async function startServer() {
  const app = express();
  app.use(cors());

  sms(app);
  email(app);
  image(app);

  app.use(bodyParser.json());
  app.post("/push", (req, res) => {
    const sub = req.body;
    console.log(sub);
    res.set("Content-Type", "application/json");
    console.log(config.webPush.publicKey, config.webPush.privateKey);
    webpush.setVapidDetails(
      "blocks:Notworking@gmail.com",
      config.webPush.publicKey,
      config.webPush.privateKey
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
  });

  graphql(app);

  await require("./loaders/mongoose").mongooseConnect();
  app.listen(config.port, err => {
    if (err) {
      console.Error(err);
      process.exit(1);
      return;
    }
    console.log(`
      ################################################
           🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
}

startServer();
