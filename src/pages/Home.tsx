import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { SEARCH_USERS } from "../graphql/queries";
import {
  SearchUsersData,
  SearchUsersVariables,
  UserNode,
} from "../models/user";
import { artwork } from "@/assets/images";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import logo from "@/assets/logo-navbar.svg";


const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useQuery<
    SearchUsersData,
    SearchUsersVariables
  >(SEARCH_USERS, {
    variables: { query: searchQuery },
    skip: !searchQuery.trim(),
  });

  function useDebounce(callback: Function, delay: number) {
    const timer = useRef<number | null>(null);

    return (...args: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }

  const users =
    data?.search?.edges?.map(({ node }: { node: UserNode }) => ({
      id: node.login,
      name: node.name || node.login,
      avatar: node.avatarUrl,
      bio: node.bio || "No bio available",
    })) || [];

  const handleOnSelect = (item: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
  }) => {
    if (item.id === "view_all") {
      navigate(`/similar-users/${searchQuery}`);
    } else {
      navigate(`/repositories/${item.id}`);
    }
  };

  const handleSearchChange = useDebounce((input: string) => {
    setSearchQuery(input);
  }, 100);

  // Handle Enter key press to navigate to similar users page
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchQuery.trim()) {
      navigate(`/similar-users/${searchQuery}`);
    }
  };

  const formatResult = (item: {
    avatar: string;
    name: string;
    bio: string;
  }) => (
    <div className="flex items-center">
      {item.avatar && (
        <img
          src={item.avatar}
          alt={item.name}
          className="w-8 h-8 rounded-full mr-2"
        />
      )}
      <div className="flex flex-col justify-end text-left">
        <span className="font-medium leading-4">{item.name}</span>
        <p className="text-sm text-gray-500">{item.bio}</p>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#0d082d] text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${artwork})` }}
      ></div>

      {/* Centered Content */}
      <div className="relative z-10 text-center w-full flex items-center flex-col">
        <img src={logo} alt="Logo" className="h-32 w-32 opacity-70" />
        <h1 className="text-4xl font-bold mb-4 tracking-wider opacity-70">
          GitGet
        </h1>
        <p className="text-lg font-light mb-8 tracking-wider opacity-60">
          Just another GitHub Client
        </p>
        <div className="w-1/2">
          {error && (
            <p className="text-red-500 text-center mb-4">
              Error loading users: {error.message}
            </p>
          )}

    

          <div className="search-wrapper" onKeyDown={handleKeyDown}>
            <SearchAutocomplete
              items={
                loading || error
                  ? []
                  : [
                      ...users.slice(0, 5), // Display up to 5 users
                      {
                        id: "view_all",
                        name: `View all users similar to ${searchQuery}`,
                      },
                    ]
              }
              onSearch={handleSearchChange}
              onSelect={handleOnSelect}
              placeholder="Search GitHub username or name"
              formatResult={formatResult}
              styling={{
                zIndex: 2,
                border: "none",
                backgroundColor: "#2E3656",
                color: "#ffffff",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
