import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import UserProfile from "@/components/UserDetails";
import RepositoryCard from "@/components/RepositoryCard";
import Pagination from "@/components/Pagination";
import Navbar from "@/components/NavBar";
import {
  GET_REPOSITORIES,
  GetRepositoriesData,
  GetRepositoriesVariables,
  LanguageEdge,
  Repository,
} from "../graphql/queries";

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

  return (
    <div
      className="min-h-screen flex flex-col bg-[#0d082d] text-white"
    >
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
              stats={`${data.user.repositories.totalCount} repositories`}
              location={data.user.location}
              followers={`${data.user.followers.totalCount} followers`}
              following={`${data.user.following.totalCount} followings`}
            />
          ) : (
            <p>Loading profile...</p>
          )}
        </div>

        {/* Main Content Section */}
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

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
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
