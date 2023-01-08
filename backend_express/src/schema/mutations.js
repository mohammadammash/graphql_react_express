const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } = require("graphql");
//internal
const { UserType, ProjectType } = require("./types");
const UserModel = require("../config/models/User");
const ProjectModel = require("../config/models/Project");

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const user = new UserModel({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return user.save();
      },
    },

    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return UserModel.findByIdAndRemove(args.id);
      },
    },

    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLNonNull(GraphQLString), defaultValue: "Not Started" },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const new_project = new ProjectModel({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return new_project.save();
      },
    },

    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return ProjectModel.findByIdAndRemove(args.id);
      },
    },

    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
      },
      resolve(parent, args) {
        return ProjectModel.findByIdAndUpdate(
          args.id,
          {
            name: args.name,
            description: args.description,
            status: args.status,
          },
          { new: true }
        )
          .then((data) => data)
          .catch((err) => err);
      },
    },
  },
});

module.exports = RootMutation;
