const express_graphql = require("express-graphql");
const bodyParser = require("body-parser");
const graphiqlShcema = require("../models/graphql/schema/schema");
const graphqlResolvcer = require("../models/graphql/resolver/resolver");
const isAuth = require("../api/middlewares/is-auth");
const cors = require("cors");
module.exports = graphql = app => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(isAuth);
  app.use(
    "/graphql",
    express_graphql({
      schema: graphiqlShcema,
      rootValue: graphqlResolvcer,
      graphiql: true
    })
  );
  app.use("**", (req, res, next) => {
    res.redirect("/graphql");
    next();
  });
};
