import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./header"; 
import { ClipLoader } from "react-spinners"; // Import spinner
import { Link } from "react-router-dom";

const Popular = () => {
    const [popularAnimes, setPopularAnimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopularAnime = async () => {
            try {
                const response = await axios.get("https://api.jikan.moe/v4/top/anime");
                setPopularAnimes(response.data.data.slice(0, 20));
            } catch (error) {
                console.error("Error fetching anime:", error);
                setError("Failed to load anime data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPopularAnime();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-10">
                <h1 className="text-3xl font-bold text-blue-400 mb-6">🔥 Popular Anime</h1>

                {loading && <p className="text-center text-gray-400"> <ClipLoader size={50} color={"#3498db"} loading={loading} /></p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-6xl">
                    {popularAnimes.map((anime) => (
                        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
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

export default Popular;
