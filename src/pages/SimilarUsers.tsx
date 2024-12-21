import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { SEARCH_USERS } from "../graphql/queries";

import Navbar from "@/components/NavBar";
import UserCard from "@/components/UserCard";



const SimilarUsers: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const { loading, error, data } = useQuery(SEARCH_USERS, {
    variables: {
      query,
    },
    skip: !query,
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data?.search?.edges || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#070036] text-white">
      {/* Navbar */}
      <Navbar />

      {/* User List */}
      <div className="container mx-auto mt-8">
        <ul className="w-full max-w-3xl mx-auto">
          {users.map(({ node }: any, index: number) => (
            <UserCard
              key={index}
              avatarUrl={node.avatarUrl}
              name={node.name}
              login={node.login}
              bio={node.bio}
              company={node.company}
              repositories={node.repositories.totalCount}
              followers={node.followers.totalCount}
              following={node.following.totalCount}
              joinedAt={node.createdAt}
            />
          ))}
        </ul>
      </div>


    </div>
  );
};

export default SimilarUsers;
