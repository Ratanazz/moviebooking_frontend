import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/API";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null); // Single movie
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await API.get(`/movies/${id}`); // Adjust endpoint as necessary
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.image_banner} alt={movie.title} />
      <p>{movie.description}</p>
      <p>Release Date: {movie.release_date}</p>
      <h2>Available Times</h2>
      <ul>
        {(movie.available_times || []).map((time, index) => (
          <li key={index}>{time}</li>
        ))}
      </ul>
      <h2>Seats</h2>
      <ul>
        {(movie.seats || []).map((seat) => (
          <li key={seat.id}>
            Seat {seat.id}: {seat.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
