const express = require("express");
require("dotenv").config();
require("./config/database_connection")();
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
//internal
const schema = require("./schema");

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development", //localhost:port/graphql
  })
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running on Port: " + port);
  console.log("-------------------------");
});
