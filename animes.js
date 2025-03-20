// AnimeCard.js
const AnimeCard = ({ anime }) => {
    return (
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
    );
  };
  
  export default AnimeCard;