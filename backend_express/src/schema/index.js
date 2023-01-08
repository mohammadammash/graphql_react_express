const { GraphQLSchema } = require("graphql");
//internal imports
const RootQuery = require("./query");
const RootMutation = require("./mutations");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
