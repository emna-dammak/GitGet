import React from "react";


/**
 * Navbar component that renders a navigation bar with a logo and links.
 * 
 * @returns {JSX.Element} The rendered navigation bar component.
 * 
 * @remarks
 * The navigation bar has a fixed position at the top of the page, with a background color,
 * some opacity, and a blur effect. It contains a logo and two navigation links: "Home" and "Search".
 * 
 * @example
 * ```tsx
 * import Navbar from './components/NavBar';
 * 
 * const App: React.FC = () => {
 *   return (
 *     <div>
 *       <Navbar />
 *    {/* Other content *\/}
 *     </div>
 *   );
 * };
 * ```
 */
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
