import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#0d082d] bg-opacity-50 backdrop-blur-lg text-white p-4 pl-10 flex justify-between items-center fixed w-full h-16 z-10 border-b-2 border-slate-800">
      {/* Navigation Links */}
      <div className="flex space-x-10 opacity-100">
        <img src="/logo-nabar.svg" alt="Logo" className="h-8 w-8" />
        <a href="/" className="text-white hover:text-gray-400 self-center">
          Home
        </a>
        <a href="/" className="hover:text-gray-400 self-center">
          Search
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
