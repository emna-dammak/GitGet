/**
 * Represents a user node with various details.
 */
export interface UserNode {
  /**
   * The URL of the user's avatar.
   */
  avatarUrl: string;

  /**
   * The name of the user. Can be null.
   */
  name: string | null;

  /**
   * The login username of the user.
   */
  login: string;

  /**
   * The bio of the user. Can be null.
   */
  bio: string | null;

  /**
   * The company the user is associated with. Can be null.
   */
  company: string | null;

  /**
   * An object representing the user's repositories.
   */
  repositories: {
    /**
     * The total count of repositories.
     */
    totalCount: number;
  };

  /**
   * An object representing the user's followers.
   */
  followers: {
    /**
     * The total count of followers.
     */
    totalCount: number;
  };

  /**
   * An object representing the users the user is following.
   */
  following: {
    /**
     * The total count of users the user is following.
     */
    totalCount: number;
  };

  /**
   * The date and time when the user was created.
   */
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
