import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";



const Repositories: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: { username },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Repositories for {username}</h1>
      <ul className="w-full max-w-3xl">
        {data.user.repositories.nodes.map((repo: any) => (
          <li
            key={repo.id}
            className="border border-gray-300 p-4 mb-4 rounded shadow"
          >
            <h2 className="text-xl font-semibold">{repo.name}</h2>
            <p className="text-gray-600">{repo.description}</p>
            <p className="text-sm text-gray-500">
              Language: {repo.primaryLanguage?.name || "N/A"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Repositories;
