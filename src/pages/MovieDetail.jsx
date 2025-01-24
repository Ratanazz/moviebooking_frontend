import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/API";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await API.get(`/movies/${id}`);
        setMovie(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading movie details...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div className="movie-detail">
      <h1>{movie.title}</h1>
      <img 
        src={movie.image_banner} 
        alt={`${movie.title} banner`} 
        className="movie-banner"
      />
      <iframe src={movie.trailer_url} frameborder="0"></iframe>
      
      <div className="movie-info">
        <p>{movie.description}</p>
        <p>Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
        <p>Rating: {movie.rating}/10</p>
      </div>

      <section className="show-times">
        <h2>Available Show Times</h2>
        {movie.shows && movie.shows.length > 0 ? (
          <ul>
            {movie.shows.map((show) => (
              <li key={show.id}>
                Time: {new Date(show.show_time).toLocaleString()}
                <br />
                Price: ${show.price}
                <br />
                Screen: {show.screen_id}
              </li>
            ))}
          </ul>
        ) : (
          <p>No show times available</p>
        )}
      </section>

      <section className="available-seats">
        <h2>Available Seats</h2>
        {movie.shows && movie.shows[0]?.available_seats?.length > 0 ? (
          <ul>
            {movie.shows[0].available_seats.map((seat) => (
              <li key={seat.id}>
                Seat {seat.seat_number}: Available
              </li>
            ))}
          </ul>
        ) : (
          <p>No seats available</p>
        )}
      </section>
    </div>
  );
}