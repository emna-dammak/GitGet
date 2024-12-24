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
