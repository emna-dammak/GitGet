import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#524D73]  text-white p-4 pl-10 flex justify-between fixed w-full h-16 z-10 ">
      <div className="flex space-x-10 opacity-100">
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
