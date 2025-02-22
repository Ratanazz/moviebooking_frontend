import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { PiArmchairLight, PiArmchairFill } from "react-icons/pi";
import API from "../services/API";
import styles from "./MovieDetail.module.css";
import imdbLogo from "../image/imdb-logo.png";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const { isAuthenticated ,checkAuthStatus} = useAuth();
  // Refs for scrolling
  const seatingAreaRef = useRef(null);
  const trailerRef = useRef(null);
  const showTimesRef = useRef(null);

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

  const handleShowtimeClick = async (show) => {
    setSelectedShow(show);
    setSelectedSeat(null);
  
    try {
      const response = await API.get(`/shows/${show.id}/seats`);
      console.log("Available seats response:", response.data); // Log the response
      setAvailableSeats(response.data);
    } catch (error) {
      console.error("Error fetching available seats:", error);
    }
  
    seatingAreaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSeatClick = (seat) => {
    if (!seat.is_available) {
      alert("This seat is already taken.");
      return;
    }
  
    setSelectedSeats((prevSeats) => {
      if (prevSeats.some((s) => s.id === seat.id)) {
        // Remove the seat if already selected
        return prevSeats.filter((s) => s.id !== seat.id);
      } else {
        // Add the seat if not already selected
        return [...prevSeats, seat];
      }
    });
  };
  const handleBookSeat = async () => {
    if (!isAuthenticated) {
      alert("Please log in to book seats.");
      navigate('/login');
      return;
    }

    if (selectedSeats.length === 0 || !selectedShow) {
      alert("Please select at least one seat and a showtime.");
      return;
    }

    try {
      const response = await API.post("/book-seat", {
        show_id: selectedShow.id,
        seat_ids: selectedSeats.map(seat => seat.id),
      });

      if (response.data.success) {
        alert("Seats booked successfully!");
        
        // Refresh seats after successful booking
        const updatedSeatsResponse = await API.get(`/shows/${selectedShow.id}/seats`);
        setAvailableSeats(updatedSeatsResponse.data);
        setSelectedSeats([]);
      }
    } catch (error) {
      console.error("Booking error:", error);
      
      if (error.response?.status === 401) {
        // Check auth status before redirecting
        await checkAuthStatus();
        if (!isAuthenticated) {
          alert("Your session has expired. Please log in again.");
          navigate('/login');
        }
      } else {
        alert(error.response?.data?.message || "Failed to book seats. Please try again.");
      }
    }
  };

  const scrollToTrailer = () => {
    trailerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToShowTimes = () => {
    showTimesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
            <p>RunTime: {movie.formatted_run_time}</p>
            {movie.rating && (
              <div className={styles["movie-rating-container"]}>
                <img src={imdbLogo} alt="IMDb" className={styles["imdb-logo"]} />
                {movie.rating}
              </div>
            )}
            <div className={styles["action-buttons"]}>
              {movie.trailer_url && (
                <button 
                  className={styles["trailer-button"]} 
                  onClick={scrollToTrailer}
                >
                  Watch Trailer
                </button>
              )}
              <button 
                className={styles["ticket-button"]} 
                onClick={scrollToTrailer}
              >
                Get Ticket
              </button>
            </div>
          </div>
        </div>
      </div>

      {movie.trailer_url && (
        <section className={styles["movie-trailer"]} ref={trailerRef}>
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

      <section className={styles["show-times"]} ref={showTimesRef}>
        <h2>Available Show Times</h2>
        {movie.shows && movie.shows.length > 0 ? (
          <div className={styles["show-time-container"]}>
            {movie.shows.map((show) => (
              <div
                key={show.id}
                className={`${styles["show-time"]} ${
                  selectedShow?.id === show.id ? styles["selected-showtime"] : ""
                }`}
                onClick={() => handleShowtimeClick(show)}
              >
                {new Date(show.show_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            ))}
          </div>
        ) : (
          <p>No show times available</p>
        )}
      </section>

      <section className={styles["available-seats"]} ref={seatingAreaRef}>
        <h2>Available Seats</h2>
        {selectedShow && selectedShow.available_seats && selectedShow.available_seats.length > 0 ? (
          <div className={styles["seating-area"]}>
            <div className={styles["screen"]}>SCREEN</div>
                <div className={styles["seat-grid"]}>
                  {selectedShow.available_seats.map((seat) => (
                    <div
                      key={seat.id}
                      className={`${styles["seat"]} ${
                        seat.is_available ? styles["available"] : styles["taken"]
                      } ${selectedSeats.some(s => s.id === seat.id) ? styles["selected-seat"] : ""}`}
                      onClick={() => handleSeatClick(seat)}
                    >
                      {seat.is_available ? <PiArmchairLight /> : <PiArmchairFill />}
                      <span>{seat.seat_number}</span>
                    </div>
                  ))}
                </div>
                          {selectedSeats.length > 0 && (
                <div className={styles["ticket-info"]}>
                  <p>
                    Selected Seats: {selectedSeats.map(seat => seat.seat_number).join(", ")} | 
                    Total Price: ${selectedSeats.length * selectedShow.price}
                  </p>
                  <button 
                    className={styles["book-button"]} 
                    onClick={handleBookSeat}
                  >
                    Book Now
                  </button>
                </div>
              )}
          </div>
        ) : (
          <p>Select a showtime to view available seats.</p>
        )}
      </section>
    </div>
  );
}