import React, { useEffect, useState } from "react";
import API from '../services/API';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch movies from the backend
    const fetchMovies = async () => {
      try {
        const response = await API.get("/movies"); // Adjust the endpoint
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <p>Loading movies...</p>;
  }
  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img src={movie.poster_image}  />
            <img src={movie.image_banner}  />
            <p>{movie.description	}</p>
            <strong>{movie.title}</strong> - {movie.release_date}
          </li>
        ))}
      </ul>
    </div>
  )
}
