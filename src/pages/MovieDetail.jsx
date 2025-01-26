import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PiArmchairLight, PiArmchairFill } from "react-icons/pi"; // Importing icons
import API from "../services/API";
import styles from "./MovieDetail.module.css";
import imdbLogo from "../image/imdb-logo.png";

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

  if (loading) return <div className={styles.loading}>Loading movie details...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!movie) return <div className={styles.loading}>No movie found</div>;

  return (
    <div className={styles["movie-detail"]}>
      <div
        className={styles["top-detail"]}
        style={{ backgroundImage: `url(${movie.image_banner})` }}
      >
        <div className={styles["left-side"]}>
          <img
            src={movie.poster_image}
            className={styles["movie-poster"]}
            alt={`${movie.title} poster`}
          />
        </div>

        <div className={styles["right-side"]}>
          <div className={styles["movie-info"]}>
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <p>Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
            {movie.rating && (
              <div className={styles["movie-rating-container"]}>
                <img src={imdbLogo} alt="IMDb" className={styles["imdb-logo"]} />
                {movie.rating}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Movie Trailer Section Below Poster */}
      {movie.trailer_url && (
        <section className={styles["movie-trailer"]}>
          <h2>Watch the Trailer</h2>
          <div className={styles["trailer-container"]}>
            <iframe
              src={movie.trailer_url}
              title="Movie Trailer"
              className={styles["movie-trailer-iframe"]}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      )}

      {/* Showing Times Section */}
      <section className={styles["show-times"]}>
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

      {/* Available Seats Section */}
      <section className={styles["available-seats"]}>
        <h2>Available Seats</h2>
        <div className={styles["seating-area"]}>
          <div className={styles["screen"]}>SCREEN</div>
          {movie.shows && movie.shows[0]?.available_seats?.length > 0 ? (
            <div className={styles["seat-grid"]}>
              {movie.shows[0].available_seats.map((seat) => (
                <div
                  key={seat.id}
                  className={`${styles["seat"]} ${
                    seat.is_available ? styles["available"] : styles["taken"]
                  }`}
                >
                  {seat.is_available ? <PiArmchairLight /> : <PiArmchairFill />}
                  <span>{seat.seat_number}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No seats available</p>
          )}
        </div>
      </section>
    </div>
  );
}
