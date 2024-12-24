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
  visibility : string;
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