const { config } = require("./config");
const express = require("express");
const graphql = require("./loaders/graphql");
const sms = require("./loaders/sms");
const email = require("./loaders/mailer");
const image = require("./loaders/imagesUploader");
const notpush = require("./loaders/web_push");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
async function startServer() {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    /////////////////////
    // axios({
    //     url: "https://hotgraphapi20200206111431.azurewebsites.net/",
    //     method: "post",
    //     data: {
    //         query: `
    //         {
    //           services {
    //             aServiceId
    //             serviceName
    //             isActive
    //           }
    //         }

    //       `
    //     }
    // })
    //     .then((result) => {
    //         console.log(result.data.data.services, "&&&&&&&&&");
    //     })
    //     .catch((err) => {
    //         console.log(err, "00000000");
    //     });

    //////////////
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
