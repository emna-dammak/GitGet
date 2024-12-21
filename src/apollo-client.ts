import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql", // GitHub GraphQL API endpoint
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`, // Token from .env
  },
  cache: new InMemoryCache(),
});

export default client;
