const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const UserModel = require("../config/models/User");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      //populating id of clientId found in project when asked for client
      type: UserType,
      resolve(parent, args) {
        return UserModel.findById(parent.id);
      },
    },
  }),
});

module.exports = { UserType, ProjectType };
