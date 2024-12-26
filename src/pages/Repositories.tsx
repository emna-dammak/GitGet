import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import UserProfile from "@/components/UserDetails";
import RepositoryCard from "@/components/RepositoryCard";
import Pagination from "@/components/Pagination";
import Navbar from "@/components/NavBar";
import { GET_REPOSITORIES } from "../graphql/queries";
import {
  GetRepositoriesData,
  GetRepositoriesVariables,
  LanguageEdge,
  Repository,
} from "../models/repository";
import LoadingSpinner from "@/components/LoadingSpinner";
import NotFound from "@/components/NotFound";
/**
 * RepositoriesPage component displays a user's GitHub repositories with filtering and pagination.
 * 
 * @component
 * @example
 * ```tsx
 * <RepositoriesPage />
 * ```
 * 
 * @returns {JSX.Element} The rendered RepositoriesPage component.
 * 
 * @remarks
 * This component fetches repositories for a given GitHub username using GraphQL and displays them with options to filter by language and search by repository name. It also includes pagination to navigate through the repositories.
 * 
 * @requires
 * - `useParams` from `react-router-dom` to get the username from the URL.
 * - `useState` and `useEffect` from `react` for state management and side effects.
 * - `useQuery` from `@apollo/client` to fetch data using GraphQL.
 * 
 * @param {Object} props - The props object.
 * 
 * @property {string} username - The GitHub username obtained from the URL parameters.
 * @property {string} searchTerm - The search term for filtering repositories by name.
 * @property {Repository[]} filteredRepos - The list of filtered repositories based on search term and selected language.
 * @property {string} selectedLanguage - The selected programming language for filtering repositories.
 * @property {number} currentPage - The current page number for pagination.
 * @property {number} reposPerPage - The number of repositories to display per page.
 * 
 * @returns {JSX.Element} The rendered RepositoriesPage component.
 * 
 * @example
 * ```tsx
 * <RepositoriesPage />
 * ```
 */
const RepositoriesPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 5;

  if (!username) {
    return <p>Username not provided</p>;
  }

  const { data, loading, error } = useQuery<
    GetRepositoriesData,
    GetRepositoriesVariables
  >(GET_REPOSITORIES, {
    variables: { username },
    skip: !username,
  });

  useEffect(() => {
    if (data && data.user.repositories.nodes) {
      const repos = data.user.repositories.nodes;

      // Apply language filter
      const languageFilteredRepos =
        selectedLanguage === "all"
          ? repos
          : repos.filter((repo: Repository) =>
              repo.languages.edges.some(
                (edge: LanguageEdge) =>
                  edge.node.name.toLowerCase() ===
                  selectedLanguage.toLowerCase()
              )
            );

      // Apply search term filter
      const searchFilteredRepos = languageFilteredRepos.filter(
        (repo: Repository) =>
          repo.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredRepos(searchFilteredRepos);
      setCurrentPage(1); // Reset page to 1
    }
  }, [data, searchTerm, selectedLanguage]);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedRepos = filteredRepos.slice(
    (currentPage - 1) * reposPerPage,
    currentPage * reposPerPage
  );

  const allLanguages: { name: string; color: string | null }[] = Array.from(
    new Map(
      (data?.user.repositories.nodes.flatMap((repo: Repository) =>
        repo.languages.edges.map((edge: LanguageEdge) => [
          edge.node.name,
          edge.node.color ?? "#ccc",
        ])
      ) ?? []) as [string, string][]
    )
  ).map(([name, color]) => ({ name, color }));
  if (loading)
    return (
      <div className="min-h-screen flex  bg-[#0d082d] text-white justify-center ">
        <LoadingSpinner width="75" strokeWidth="1" strokeColor="white" />
      </div>
    );
  return (
    <div className="min-h-screen flex flex-col bg-[#0d082d] text-white">
      <Navbar />
      <div className="flex flex-col md:flex-row pt-16 z-0 h-full ">
        {/* Left Profile Section */}
        <div className="w-full md:w-1/4  md:top-16 lg:left-0">
          {data && data.user ? (
            <UserProfile
              avatarUrl={data.user.avatarUrl}
              name={data.user.name || ""}
              username={username || ""}
              bio={data.user.bio}
              repositoryCount={`${data.user.repositories.totalCount}`}
              location={data.user.location}
              followers={`${data.user.followers.totalCount}`}
              following={`${data.user.following.totalCount}`}
            />
          ) : (
            <p>Loading profile...</p>
          )}
        </div>

        {/* Main Content Section */}
        {displayedRepos.length > 0 ? (
          <div className="w-full md:w-3/4 lg:w-5/6 p-4 flex flex-col items-center">
            <div className="mb-4 md:w-[80%] 2xs:w-full flex flex-col md:flex-row gap-6 justify-center py-4">
              <input
                type="text"
                className="w-full md:w-1/2 p-2 rounded-xl bg-[#2E3656] bg-opacity-90"
                placeholder="Search repositories"
                value={searchTerm}
                onChange={handleSearchChange}
              />

              <select
                className="mt-4 md:mt-0 p-2 px-3 bg-[#2E3656] rounded-xl"
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                <option value="all">All Languages</option>
                {allLanguages.map((language) => (
                  <option key={language.name} value={language.name}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>

            {loading && (
              <div className="min-h-screen flex  bg-[#0d082d] text-white justify-center ">
                <LoadingSpinner
                  width="75"
                  strokeWidth="1"
                  strokeColor="white"
                />
              </div>
            )}
            {error && <NotFound type="repository" message={error.message} />}
            {displayedRepos.map((repo: Repository) => (
              <RepositoryCard
                key={repo.name}
                name={repo.name}
                description={repo.description}
                visibility={repo.visibility}
                languages={repo.languages.edges.map((edge: LanguageEdge) => ({
                  name: edge.node.name,
                  color: edge.node.color,
                }))}
                stars={repo.stargazers.totalCount}
                license={repo.licenseInfo?.name}
                createdAt={repo.createdAt}
                updatedAt={repo.updatedAt}
                url={repo.url}
              />
            ))}

            {displayedRepos.length > reposPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredRepos.length / reposPerPage)}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        ) : (
          <NotFound
            type="repository"
            message="This user has no repository yet!"
          />
        )}
      </div>
    </div>
  );
};

export default RepositoriesPage;
