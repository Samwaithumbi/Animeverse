import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-md ">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-400">AnimeVerse</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
        <Link to="/search" className="hover:text-blue-400 transition duration-300">Search</Link>
          <Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link>
          <Link to="/new" className="hover:text-blue-400 transition duration-300">New</Link>
          <Link to="/popular" className="hover:text-blue-400 transition duration-300">Popular</Link>
          <Link to="/watchlist" className="hover:text-blue-400 transition duration-300">Watch List</Link>
        </nav>

        

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl text-white" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${menuOpen ? "block" : "hidden"}`}>
        <nav className="bg-gray-800 py-4 text-center space-y-4">
        <Link to="/search" className="block hover:text-blue-400">Search</Link>
          <Link to="/" className="block hover:text-blue-400">Home</Link>
          <Link to="/new" className="block hover:text-blue-400">New</Link>
          <Link to="/popular" className="block hover:text-blue-400">Popular</Link>
          <Link to="/watchlist" className="block hover:text-blue-400">Watch List</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
