import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import spinner for loading state
import {FaArrowLeft} from "react-icons/fa"
import {  useNavigate } from "react-router-dom";

const AnimeDetails = () => {
  const { id } = useParams(); // Get the anime ID from the URL
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const navigate=useNavigate()

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        if (response.data.data) {
          setAnime(response.data.data); // Set the anime details
        } else {
          setError("Anime not found."); // Handle case where anime data is not available
        }
      } catch (error) {
        console.error("Error fetching anime details:", error);
        setError("Failed to fetch anime details. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchAnimeDetails();
  }, [id]); // Re-fetch when the ID changes

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <ClipLoader size={50} color={"#3498db"} loading={loading} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p>No anime data available.</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <FaArrowLeft className="text-2xl text-white cursor-pointer" onClick={()=>navigate(-1)} />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">{anime.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Anime Information */}
          <div>
            <p className="text-lg mb-4">{anime.synopsis}</p>

            <div className="space-y-4">
              <p>
                <span className="font-semibold">⭐ Score:</span> {anime.score || "N/A"}
              </p>
              <p>
                <span className="font-semibold">📺 Episodes:</span> {anime.episodes || "N/A"}
              </p>
              <p>
                <span className="font-semibold">📅 Aired:</span> {anime.aired?.string || "N/A"}
              </p>
              <p>
                <span className="font-semibold">🔞 Rating:</span> {anime.rating || "N/A"}
              </p>
              <p>
                <span className="font-semibold">📊 Status:</span> {anime.status || "N/A"}
              </p>
              <p>
                <span className="font-semibold">🌐 Website:</span>{" "}
                <a
                  href={anime.trailer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Watch Trailer
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;