import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { SEARCH_USERS } from "../graphql/queries";

const SimilarUsers: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(SEARCH_USERS, {
    variables: { query },
    skip: !query,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data?.search?.edges || [];

  if (!users.length) return <p>No users found for "{query}"</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Users matching "{query}"</h1>
      <ul className="w-full max-w-3xl">
        {users.map(({ node }: any, index: number) => (
          <li
            key={index}
            className="border border-gray-300 p-4 mb-4 rounded shadow flex items-center"
          >
            <img
              src={node.avatarUrl}
              alt={node.login}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">
                {node.name || node.login}
              </h2>
              <p className="text-sm text-gray-600">
                {node.bio || "No bio available"}
              </p>
              <button
                onClick={() => navigate(`/repositories/${node.login}`)}
                className="text-blue-500 underline mt-2"
              >
                View Repositories
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimilarUsers;
