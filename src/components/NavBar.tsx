import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white bg-opacity-30 text-white p-4 pl-10 flex justify-between z-0">
      <div className="flex space-x-10 z-10 opacity-100">
        <a href="/" className=" text-white hover:text-gray-400">
          Home
        </a>
        <a href="/" className="hover:text-gray-400">
          Search
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
