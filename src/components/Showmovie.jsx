import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/API";
import "../components/css_component/Showmovie.css";

export default function Showmovie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
            <Link to={`/movie/${movie.id}`}>
              <img src={movie.poster_image} alt={movie.title} />
              <strong>{movie.title}</strong> - {movie.release_date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
