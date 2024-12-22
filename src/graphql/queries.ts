import { gql } from "@apollo/client";

export interface UserNode {
  avatarUrl: string;
  name: string | null;
  login: string;
  bio: string | null;
  company: string | null;
  repositories: {
    totalCount: number;
  };
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  createdAt: string;
}

export interface SearchUsersEdge {
  node: UserNode;
}

export interface SearchUsersData {
  search: {
    edges: SearchUsersEdge[];
  };
}
export interface SearchUsersVariables {
  query: string;
}

// Define the Language type
export interface LanguageNode {
  name: string;
  color: string | null;
}

export interface LanguageEdge {
  node: LanguageNode;
}
// Define types for the `GetRepositories` query
export interface Repository {
  id: string;
  name: string;
  description?: string;
  languages: {
    edges: LanguageEdge[];
  };
  stargazers: {
    totalCount: number;
  };
  licenseInfo?: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  url: string;
}

export interface User {
  avatarUrl: string;
  name?: string;
  bio?: string;
  location?: string;
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  repositories: {
    totalCount: number;
    nodes: Repository[];
  };
}

export interface GetRepositoriesData {
  user: {
    avatarUrl: string;
    name: string | null;
    bio: string | null;
    location: string | null;
    followers: {
      totalCount: number;
    };
    following: {
      totalCount: number;
    };
    repositories: {
      totalCount: number;
      nodes: Repository[];
    };
  };
}
export interface GetRepositoriesVariables {
  username: string;
}

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
  
