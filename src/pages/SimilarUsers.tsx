import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { SEARCH_USERS } from "../graphql/queries";
import {
  SearchUsersData,
  SearchUsersEdge,
  SearchUsersVariables,
} from "../models/user";
import Navbar from "@/components/NavBar";
import UserCard from "@/components/UserCard";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import NotFound from "@/components/NotFound";

/**
 * `SimilarUsers` is a React functional component that displays a list of users similar to the one specified in the query parameter.
 * It fetches user data based on the query parameter using a GraphQL query and displays the results with pagination.
 *
 * @component
 * @example
 * ```tsx
 * <SimilarUsers />
 * ```
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * - If the query parameter is not provided, it displays a message indicating that the username is not provided.
 * - If there is an error during the data fetching, it displays the error message.
 * - While the data is loading, it displays a loading spinner.
 * - If no users are found, it displays a `NotFound` component with a message.
 *
 * @hook
 * - `useParams` to get the query parameter from the URL.
 * - `useState` to manage the current page state.
 * - `useQuery` to fetch user data based on the query parameter.
 *
 * @typedef {Object} SearchUsersData
 * @property {Object} search - The search result object.
 * @property {Array<SearchUsersEdge>} search.edges - The array of user edges.
 *
 * @typedef {Object} SearchUsersEdge
 * @property {Object} node - The user node object.
 * @property {string} node.avatarUrl - The URL of the user's avatar.
 * @property {string} node.name - The name of the user.
 * @property {string} node.login - The login of the user.
 * @property {string} node.bio - The bio of the user.
 * @property {string} node.company - The company of the user.
 * @property {Object} node.repositories - The repositories object.
 * @property {number} node.repositories.totalCount - The total count of repositories.
 * @property {Object} node.followers - The followers object.
 * @property {number} node.followers.totalCount - The total count of followers.
 * @property {Object} node.following - The following object.
 * @property {number} node.following.totalCount - The total count of following.
 * @property {string} node.createdAt - The date the user joined.
 *
 * @typedef {Object} SearchUsersVariables
 * @property {string} query - The query parameter for the search.
 */
const SimilarUsers: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  if (!query) {
    return <NotFound type="user" message="Username not provided" />;
  }

  const { data, loading, error } = useQuery<
    SearchUsersData,
    SearchUsersVariables
  >(SEARCH_USERS, {
    variables: { query },
    skip: !query,
  });

  if (error) return (
    <NotFound
      type="user"
      message={error.message}
    />
  );

  // Type-safe users array
  const users = data?.search?.edges ?? [];
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );
  if (loading)
    return (
      <div className="min-h-screen flex  bg-[#0d082d] text-white justify-center ">
        <LoadingSpinner width="75" strokeWidth="1" strokeColor="white" />
      </div>
    );
  return (
    <div className="min-h-screen flex flex-col bg-[#0d082d] text-white">
      {/* Navbar */}
      <Navbar />
      {displayedUsers.length > 0 ? (
        // User List
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
        { displayedUsers.length >usersPerPage && <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(users.length / usersPerPage)}
            onPageChange={handlePageChange}
          />}
        </div>
      ) : (
        <NotFound
          type="user"
          message="We couldn’t find a user with username specified. Either your input is wrong and doesn’t match any records in the database or our curious GitGet cat has stolen the record."
        />
      )}
    </div>
  );
};

export default SimilarUsers;
