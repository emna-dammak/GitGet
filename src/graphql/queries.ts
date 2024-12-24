import { gql } from "@apollo/client";

export const SEARCH_USERS = gql`
  query SearchUsers($query: String!) {
    search(query: $query, type: USER, first: 100) {
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
      avatarUrl
      name
      bio
      location
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(first: 100) {
        totalCount
        nodes {
          id
          name
          description
          visibility
          languages(first: 5) {
            edges {
              node {
                name
                color
              }
              size
            }
          }
          stargazers {
            totalCount
          }
          licenseInfo {
            name
          }
          createdAt
          updatedAt
          url
        }
      }
    }
  }
`;
  
