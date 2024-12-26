import { ApolloClient, InMemoryCache } from "@apollo/client";

/**
 * Apollo Client instance configured to interact with the GitHub GraphQL API.
 * 
 * @constant
 * @type {ApolloClient}
 * 
 * @property {string} uri - The endpoint for the GitHub GraphQL API.
 * @property {Object} headers - The headers for the API request.
 * @property {string} headers.Authorization - The authorization token for accessing the GitHub API, retrieved from environment variables.
 * @property {InMemoryCache} cache - The cache implementation for Apollo Client.
 */
const client = new ApolloClient({
  uri: "https://api.github.com/graphql", // GitHub GraphQL API endpoint
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`, // Token from .env
  },
  cache: new InMemoryCache(),
});

export default client;
