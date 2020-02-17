/**
 *  GraphQl EndPoint starter 
 */
const express_graphql = require("express-graphql");
const graphqlShcema = require("../models/graphql/schema/schema");
const graphqlResolvcer = require("../models/graphql/resolver/resolver");
const isAuth = require("../api/middlewares/is-auth");

module.exports = graphql = app => {

  /*
   * Secutity
   * Authentication Middleware
   */

  app.use(isAuth);

  /*
   *  GraphQl route
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
   * Redirecting to `/graphql` for all other routes
   */

  app.use("**", (req, res, next) => {
    res.redirect("/graphql");
    next();
  });
};