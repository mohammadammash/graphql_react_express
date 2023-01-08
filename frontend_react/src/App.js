import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
//internal
import Users from "./components/Users";
import Projects from "./components/Projects";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Users />
      </div>
      <Projects />
    </ApolloProvider>
  );
}

export default App;
