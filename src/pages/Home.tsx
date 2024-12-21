import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { SEARCH_USERS } from "../graphql/queries";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {artwork} from '@/assets/images'
const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useQuery(SEARCH_USERS, {
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
    data?.search?.edges?.map(({ node }: any) => ({
      id: node.login,
      name: node.name || node.login,
      avatar: node.avatarUrl,
      bio: node.bio || "No bio available",
    })) || [];

  const handleOnSelect = (item: any) => {
    if (item.id === "view_all") {
      navigate(`/similar-users/${searchQuery}`);
    } else {
      navigate(`/repositories/${item.id}`);
    }
  };
  const handleSearchChange = useDebounce((input: string) => {
    setSearchQuery(input); 
  }, 350); 

  const formatResult = (item: any) => (
    <div className="flex items-center">
      <img
        src={item.avatar}
        alt={item.name}
        className="w-8 h-8 rounded-full mr-2"
      />
      <div>
        <span className="font-medium">{item.name}</span>
        <p className="text-sm text-gray-500">{item.bio}</p>
      </div>
    </div>
  );

 return (
   <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#070036] text-white">
     {/* Background Image */}
     <div
       className="absolute inset-0 bg-cover bg-center"
       style={{ backgroundImage: `url(${artwork})` }}
     ></div>

     {/* Centered Content */}
     <div className="relative z-10 text-center w-full flex items-center flex-col">
       <h1 className="text-4xl font-bold mb-4 tracking-wider">GitGet</h1>
       <p className="text-lg font-light mb-8 tracking-wider">
         Just another GitHub Client
       </p>
       <div className="w-1/2">
         {loading && (
           <p className="text-gray-500 text-center mb-4">Loading users...</p>
         )}
         {error && (
           <p className="text-red-500 text-center mb-4">
             Error loading users: {error.message}
           </p>
         )}
         <ReactSearchAutocomplete
           items={
             loading || error
               ? [] // Show no items during loading or error
               : [
                   ...users.slice(0, 5),
                   { id: "view_all", name: "View all users" },
                 ]
           }
           onSearch={handleSearchChange}
           onSelect={handleOnSelect}
           placeholder="Enter GitHub username or name"
           autoFocus
           formatResult={formatResult}
           showIcon={false}
           styling={{
             zIndex: 2,
             borderRadius: "1rem",
             border: "none",
             placeholderColor: "#9ca3af",
             backgroundColor: "#2E3656",
             hoverBackgroundColor: "#475569", // Tailwind bg-gray-600
             color: "#ffffff",
           }}
         />
       </div>
     </div>
   </div>
 );
};

export default Home;
