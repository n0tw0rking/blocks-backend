const { buildSchema } = require("graphql");
const query = require("./query/query");
const mutation = require("./mutatuion/mutation");
const input = require("./input/input");
const type = require("./type/type");
module.exports = buildSchema(`
   ${input}
   ${type}
   ${query}
   ${mutation}
    schema {
        query : RootQuery,
        mutation : MutationQuery
    }`);
