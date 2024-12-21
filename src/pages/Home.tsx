import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (username.trim()) {
      navigate(`/similar-users/${username.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">GitHub User Search</h1>
      <input
        type="text"
        placeholder="Enter GitHub username or name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-400 p-2 rounded w-1/3 mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default Home;
