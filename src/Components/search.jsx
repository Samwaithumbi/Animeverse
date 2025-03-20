import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./header";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchPage = () => {
  const [searchedAnime, setSearchedAnime] = useState("");
  const [animes, setAnimes] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnime = async () => {
      if (!searchedAnime.trim()) {
        setAnimes([]); // Clear results if search term is empty
        return;
      }

      setLoading(true);
      setError(false);

      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime?q=${searchedAnime}`
        );
        setAnimes(response.data.data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the API call
    const debounceTimer = setTimeout(() => {
      fetchAnime();
    }, 500); // Wait 500ms after the user stops typing

    return () => clearTimeout(debounceTimer); // Cleanup the timer
  }, [searchedAnime]);

  return (
    <div>
      <Navbar />
      <div className="mt-0 min-h-screen bg-gray-900 text-white flex flex-col items-center px-6">
        <h1 className="text-3xl font-bold text-blue-400 mb-6">
          Search Your Favorite Anime
        </h1>
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search anime..."
            value={searchedAnime}
            onChange={(e) => setSearchedAnime(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-6">
            <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500 text-2xl" />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="mt-6 text-red-500">Failed to fetch anime data. Please try again.</p>
        )}

        {/* Results Grid */}
        <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-6xl">
          {animes.map((anime) => (
            <div
              key={anime.mal_id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-300">{anime.title}</h3>
                <p className="text-sm text-gray-400">⭐ Score: {anime.score || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {!loading && !error && animes.length === 0 && searchedAnime.trim() && (
          <p className="mt-6 text-gray-400">No results found for "{searchedAnime}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;