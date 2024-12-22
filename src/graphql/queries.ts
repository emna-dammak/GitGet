import { gql } from "@apollo/client";

export const SEARCH_USERS = gql`
  query SearchUsers($query: String!) {
    search(query: $query, type: USER, first: 10) {
      edges {
        node {
          ... on User {
            login
            name
            avatarUrl
            bio
            url
            company
            repositories {
              totalCount
            }
            followers {
              totalCount
            }
            following {
              totalCount
            }
            createdAt
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query GetRepositories($username: String!) {
    user(login: $username) {
      repositories(first: 10) {
        nodes {
          id
          name
          description
          primaryLanguage {
            name
          }
        }
      }
    }
  }
`;