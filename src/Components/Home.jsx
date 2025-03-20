import { useEffect, useState } from "react";
import Navbar from "./header";
import axios from "axios";
import {  FaArrowRight } from "react-icons/fa"; 
import { Link} from "react-router-dom"; 
import { ClipLoader } from "react-spinners"; 

const Home = () => {
  const [randomAnime, setRandomAnime] = useState(null);
  const [popularAnimes, setPopularAnimes] = useState([]);
  const [latestAnimes, setLatestAnimes] = useState([]);
  const [loadingRandom, setLoadingRandom] = useState(true);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [error, setError] = useState(null);


  const fetchRandomAnime = async () => {
    try {
      const response = await axios.get("https://api.jikan.moe/v4/random/anime");
      setRandomAnime(response.data.data);
      setLoadingRandom(false); 
    } catch (error) {
      console.error("Error fetching random anime:", error);
      setLoadingRandom(false); 
    }
  };

  // Function to fetch popular anime
  const fetchPopularAnime = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get("https://api.jikan.moe/v4/top/anime");
      setPopularAnimes(response.data.data.slice(0, 10)); // Fetch only the top 10 anime
    } catch (error) {
      console.error("Error fetching popular anime:", error);
      setError("Failed to load popular anime data. Please try again later.");
    } finally {
      setLoadingPopular(false);
    }
  };

  // Function to fetch latest anime
  const fetchLatestAnime = async () => {
    try {
      const response = await axios.get("https://api.jikan.moe/v4/seasons/now");
      setLatestAnimes(response.data.data.slice(0, 10)); // Fetch only the latest 10 anime
    } catch (error) {
      console.error("Error fetching latest anime:", error);
      setError("Failed to load latest anime data. Please try again later.");
    } finally {
      setLoadingLatest(false);
    }
  };

  useEffect(() => {
    // Fetch the first random anime after 5 seconds
    const timer = setTimeout(() => {
      fetchRandomAnime();
    }, 5000); // 5-second delay

    // Fetch popular and latest anime on component mount
    fetchPopularAnime();
    fetchLatestAnime();

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Navbar />
      {loadingRandom && <p className="text-center text-white">Loading random anime...</p>}
      {randomAnime && (
        <div
          className="relative w-full h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url(${randomAnime.images.jpg.large_image_url})`,
          }}
        >
          {/* Move Forward Icon */}
         
          <div
            className="ml-20 absolute right-0 top-80 mt-8 p-4 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition duration-300"
            onClick={fetchRandomAnime} // Fetch a new random anime on click
          >
            <FaArrowRight className="text-2xl text-white" />
          </div>

          {/* Overlay */}
          <div className="absolute bottom-0 left-0 m-0 bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
            <h1 className="text-blue-600 text-4xl lg:text-5xl font-bold ml-0 mb-4">
              {randomAnime.title}
            </h1>
        
           < p className="text-gray-600 text-lg lg:text-xl max-w-2x">⭐ {randomAnime.score}</p>
          
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-10">
        <h1 className="text-3xl font-bold text-blue-400 mb-6"> Popular Anime</h1>

        {loadingPopular && (
          <p className="text-center text-gray-400">
            <ClipLoader size={50} color={"#3498db"} loading={loadingPopular} />
          </p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-6xl">
          {popularAnimes.map((anime) => (
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-blue-300">{anime.title}</h3>
                  <p className="text-sm text-gray-400">⭐ Score: {anime.score}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest Anime Section */}
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-10">
        <h1 className="text-3xl font-bold text-blue-400 mb-6 ml-0"> Latest Anime</h1>

        {loadingLatest && (
          <p className="text-center text-gray-400">
            <ClipLoader size={50} color={"#3498db"} loading={loadingLatest} />
          </p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-6xl">
          {latestAnimes.map((anime) => (
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-blue-300">{anime.title}</h3>
                  <p className="text-sm text-gray-400">⭐ Score: {anime.score}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;