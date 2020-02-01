const { config } = require("./config");
const express = require("express");
const graphql = require("./loaders/graphql");
async function startServer() {
  const app = express();
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
