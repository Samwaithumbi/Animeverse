import { useEffect, useState } from "react";
import Navbar from "./header";
import axios from "axios";
import { Link } from "react-router-dom";

const New = () => {
    const [latestAnimes, setLatestAnimes]=useState([])
    const [error, setError]=useState(false)
    const [loading, setLoading]=useState(false)

    useEffect(()=>{
      const fetchLatestAnime=async()=>{
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
            const response=await axios.get("https://api.jikan.moe/v4/seasons/now")
            setLatestAnimes(response.data.data.slice(0,20)); 
            console.log(latestAnimes);   
        } catch (error) {
            console.error("Error fetching anime:", error);
            setError("Failed to load anime data. Please try again later.");
        }finally {
            setLoading(false);
        }
        
      }
      fetchLatestAnime()
    }, [])
    return ( 
        <div>
            <Navbar/>
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-10">
                <h1 className="text-3xl font-bold text-blue-400 mb-6">Latest Animes</h1>

                {loading && <p className="text-center text-gray-400"> <ClipLoader size={50} color={"#3498db"} loading={loading} /></p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-6xl">
                {latestAnimes.map((latestAnime) => (
  <Link
    to={`/anime/${latestAnime.mal_id}`}
    key={`${latestAnime.mal_id}-${latestAnime.title}`} // Combine mal_id and title for a unique key
  >
    <div
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
    >
      <img
        src={latestAnime.images.jpg.image_url}
        alt={latestAnime.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-blue-300">{latestAnime.title}</h3>
        <p className="text-sm text-gray-400">⭐ Score: {latestAnime.score}</p>
      </div>
    </div>
  </Link>
))}
                </div>
            </div>
        </div>
     );
}
 
export default New;