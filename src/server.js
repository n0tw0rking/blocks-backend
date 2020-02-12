const { config } = require("./config");
const express = require("express");
const graphql = require("./loaders/graphql");
const sms = require("./loaders/sms");
const email = require("./loaders/mailer");
const image = require("./loaders/imagesUploader");
const notpush = require("./loaders/web_push");
const cors = require("cors");

async function startServer() {
    const app = express();
    app.use(cors());

    sms(app);
    email(app);
    image(app);
    notpush(app);
    graphql(app);

    await require("./loaders/mongoose").mongooseConnect();
    app.listen(config.port, (err) => {
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
