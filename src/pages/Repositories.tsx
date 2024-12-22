import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import UserProfile from "@/components/UserDetails";
import RepositoryCard from "@/components/RepositoryCard";
import Pagination from "@/components/Pagination";
import { GET_REPOSITORIES } from "../graphql/queries";
import Navbar from "@/components/NavBar";

const RepositoriesPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 5;

  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
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
          : repos.filter((repo: any) =>
              repo.languages.edges.some(
                (edge: any) =>
                  edge.node.name.toLowerCase() ===
                  selectedLanguage.toLowerCase()
              )
            );

      // Apply search term filter
      const searchFilteredRepos = languageFilteredRepos.filter((repo: any) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredRepos(searchFilteredRepos);
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

  // Get all unique languages
  const allLanguages = Array.from(
    new Set(
      data?.user.repositories.nodes.flatMap((repo: any) =>
        repo.languages.edges.map((edge: any) => edge.node.name)
      )
    )
  ).filter((language): language is string => Boolean(language));

  return (
    <div className="min-h-screen flex flex-col bg-[#070036] text-white">
      <Navbar />
      <div className="flex pt-16 z-0">
        {/* Left Profile Section */}
        <div className="w-1/6">
          {data && data.user ? (
            <UserProfile
              avatarUrl={data.user.avatarUrl || ""}
              name={data.user.name || ""}
              username={username || ""}
              bio={data.user.bio || "No bio available."}
              stats={`${data.user.repositories.totalCount} repositories`}
              location={data.user.location || "Unknown"}
            />
          ) : (
            <p>Loading profile...</p>
          )}
        </div>

        {/* Main Content Section */}
        <div className="w-3/4 p-4">
          <div className="mb-4 flex justify-between items-center">
            <input
              type="text"
              className="w-1/2 p-2 border border-gray-300 rounded bg-[#2E3656] bg-opacity-90"
              placeholder="Search repositories"
              value={searchTerm}
              onChange={handleSearchChange}
            />

            <select
              className="p-2 border border-gray-300 rounded"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="all">All Languages</option>
              {allLanguages.map((language: string) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {displayedRepos.map((repo: any) => (
            <RepositoryCard
              key={repo.name}
              name={repo.name}
              description={repo.description}
              languages={repo.languages.edges.map((edge: any) => ({
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

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredRepos.length / reposPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RepositoriesPage;
