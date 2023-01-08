const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
//internal imports
const { UserType, ProjectType } = require("./types");
const UserModel = require("../config/models/User");
const ProjectModel = require("../config/models/Project");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    //USERS
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return UserModel.find();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return UserModel.findById(args.id);
      },
    },

    //PROJECTS
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return ProjectModel.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ProjectModel.findById(args.id);
      },
    },
  },
});

module.exports = RootQuery;
