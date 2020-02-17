/**
 *  GraphQl EndPoint starter 
 */
const express_graphql = require("express-graphql");
const graphqlShcema = require("../models/graphql/schema/schema");
const graphqlResolvcer = require("../models/graphql/resolver/resolver");
const isAuth = require("../api/middlewares/is-auth");

module.exports = graphql = app => {
  /*
   * GraphQl endpoing route
   */

  app.use(
    "/graphql",
    express_graphql({
      schema: graphqlShcema,
      rootValue: graphqlResolvcer,
      graphiql: true
    })
  );

  /*
   * Redirecting to `/graphql` for all other routes that are not on the api
   */

  app.use("**", (req, res, next) => {
    res.redirect("/graphql");
    next();
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