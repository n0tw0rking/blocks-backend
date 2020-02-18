/**
 *  Main GraphQl Schema 
 */
const {
    buildSchema
} = require("graphql");

/*
 * GraphQl Qurey 
 */

const query = require("./query/query");

/*
 * GraphQl Mutation 
 */

const mutation = require("./mutatuion/mutation");

/*
 * GraphQl Input
 */

const input = require("./input/input");

/*
 * GraphQl Types 
 */

const type = require("./type/type");

/*
 * GraphQl Schema Builder 
 */

module.exports = buildSchema(`
   ${input}
   ${type}
   ${query}
   ${mutation}
    schema {
        query : RootQuery,
        mutation : MutationQuery
    }`);