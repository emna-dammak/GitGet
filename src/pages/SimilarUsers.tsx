import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  SEARCH_USERS,
  SearchUsersData,
  SearchUsersEdge,
  SearchUsersVariables,
} from "../graphql/queries";

import Navbar from "@/components/NavBar";
import UserCard from "@/components/UserCard";
import Pagination from "@/components/Pagination";
import { useState } from "react";

const SimilarUsers: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  if (!query) {
    return <p>Username not provided</p>;
  }

  const { data, loading, error } = useQuery<
    SearchUsersData,
    SearchUsersVariables
  >(SEARCH_USERS, {
    variables: { query },
    skip: !query,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Type-safe users array
  const users = data?.search?.edges ?? [];
 const handlePageChange = (page: number) => {
   setCurrentPage(page);
 };

 const displayedUsers = users.slice(
   (currentPage - 1) * usersPerPage,
   currentPage * usersPerPage
 );

  return (
    <div className="min-h-screen flex flex-col bg-[#0d082d] text-white">
      {/* Navbar */}
      <Navbar />

      {/* User List */}
      <div className="container mx-auto mt-16">
        <ul className="w-full max-w-3xl mx-auto">
          {displayedUsers.map(({ node }: SearchUsersEdge, index: number) => (
            <UserCard
              key={index}
              avatarUrl={node.avatarUrl}
              name={node.name || ""}
              login={node.login}
              bio={node.bio || ""}
              company={node.company || ""}
              repositories={node.repositories?.totalCount}
              followers={node.followers.totalCount}
              following={node.following.totalCount}
              joinedAt={node.createdAt}
            />
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(users.length / usersPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SimilarUsers;
