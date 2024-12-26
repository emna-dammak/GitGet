
// Define the Language type
/**
 * Represents a programming language used in a repository.
 */
export interface LanguageNode {
  name: string;
  color: string | null;
}

export interface LanguageEdge {
  node: LanguageNode;
}
// Define types for the `GetRepositories` query
/**
 * Represents a repository with various attributes.
 */
export interface Repository {
  /**
   * Unique identifier for the repository.
   */
  id: string;

  /**
   * Name of the repository.
   */
  name: string;

  /**
   * Optional description of the repository.
   */
  description?: string;

  /**
   * Visibility status of the repository (e.g., public, private).
   */
  visibility: string;

  /**
   * Languages used in the repository.
   */
  languages: {
    /**
     * List of language edges.
     */
    edges: LanguageEdge[];
  };

  /**
   * Stargazers information for the repository.
   */
  stargazers: {
    /**
     * Total count of stargazers.
     */
    totalCount: number;
  };

  /**
   * Optional license information for the repository.
   */
  licenseInfo?: {
    /**
     * Name of the license.
     */
    name: string;
  };

  /**
   * Creation date of the repository.
   */
  createdAt: string;

  /**
   * Last update date of the repository.
   */
  updatedAt: string;

  /**
   * URL of the repository.
   */
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
/**
 * Represents the data structure for fetching repositories information.
 */
export interface GetRepositoriesData {
  /**
   * The user information.
   */
  user: {
    /**
     * The URL of the user's avatar.
     */
    avatarUrl: string;
    /**
     * The name of the user. Can be null.
     */
    name: string | null;
    /**
     * The bio of the user. Can be null.
     */
    bio: string | null;
    /**
     * The location of the user. Can be null.
     */
    location: string | null;
    /**
     * The followers information of the user.
     */
    followers: {
      /**
       * The total count of followers.
       */
      totalCount: number;
    };
    /**
     * The following information of the user.
     */
    following: {
      /**
       * The total count of users the user is following.
       */
      totalCount: number;
    };
    /**
     * The repositories information of the user.
     */
    repositories: {
      /**
       * The total count of repositories.
       */
      totalCount: number;
      /**
       * The list of repository nodes.
       */
      nodes: Repository[];
    };
  };
}
export interface GetRepositoriesVariables {
  username: string;
}