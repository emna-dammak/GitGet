import { gql } from "@apollo/client";

/**
 * GraphQL query to search for users on GitHub.
 * 
 * This query searches for users based on a provided query string and returns
 * the first 100 matching users. For each user, the following information is retrieved:
 * - `login`: The username of the user.
 * - `name`: The full name of the user.
 * - `avatarUrl`: The URL of the user's avatar image.
 * - `bio`: The biography of the user.
 * - `url`: The URL of the user's GitHub profile.
 * - `company`: The company the user is associated with.
 * - `repositories.totalCount`: The total number of repositories the user has.
 * - `followers.totalCount`: The total number of followers the user has.
 * - `following.totalCount`: The total number of users the user is following.
 * - `createdAt`: The date and time when the user created their GitHub account.
 * 
 * @param {String} query - The search query string to find users.
 */
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

/**
 * GraphQL query to fetch repositories of a user along with user details.
 *
 * @constant
 * @type {DocumentNode}
 * @name GET_REPOSITORIES
 * @query
 * @param {String} $username - The GitHub username of the user.
 * @returns {Object} - The user details and repositories.
 * @property {Object} user - The user object.
 * @property {String} user.avatarUrl - The URL of the user's avatar.
 * @property {String} user.name - The name of the user.
 * @property {String} user.bio - The bio of the user.
 * @property {String} user.location - The location of the user.
 * @property {Object} user.followers - The followers object.
 * @property {Number} user.followers.totalCount - The total number of followers.
 * @property {Object} user.following - The following object.
 * @property {Number} user.following.totalCount - The total number of following.
 * @property {Object} user.repositories - The repositories object.
 * @property {Number} user.repositories.totalCount - The total number of repositories.
 * @property {Array} user.repositories.nodes - The list of repository nodes.
 * @property {String} user.repositories.nodes.id - The ID of the repository.
 * @property {String} user.repositories.nodes.name - The name of the repository.
 * @property {String} user.repositories.nodes.description - The description of the repository.
 * @property {String} user.repositories.nodes.visibility - The visibility of the repository.
 * @property {Object} user.repositories.nodes.languages - The languages object.
 * @property {Array} user.repositories.nodes.languages.edges - The list of language edges.
 * @property {Object} user.repositories.nodes.languages.edges.node - The language node.
 * @property {String} user.repositories.nodes.languages.edges.node.name - The name of the language.
 * @property {String} user.repositories.nodes.languages.edges.node.color - The color of the language.
 * @property {Number} user.repositories.nodes.languages.edges.size - The size of the language.
 * @property {Object} user.repositories.nodes.stargazers - The stargazers object.
 * @property {Number} user.repositories.nodes.stargazers.totalCount - The total number of stargazers.
 * @property {Object} user.repositories.nodes.licenseInfo - The license information object.
 * @property {String} user.repositories.nodes.licenseInfo.name - The name of the license.
 * @property {String} user.repositories.nodes.createdAt - The creation date of the repository.
 * @property {String} user.repositories.nodes.updatedAt - The last update date of the repository.
 * @property {String} user.repositories.nodes.url - The URL of the repository.
 */
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
  
