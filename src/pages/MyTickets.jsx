import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import API from "../services/API";
import "./MyTickets.css"; // Import CSS file

const MyTickets = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await API.get("/my-bookings");
      setBookings(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load bookings");
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="ticket-container">
        <div className="ticket-box">
          <p className="ticket-message">Please log in to view your tickets.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="ticket-container">
        <div className="ticket-box">
          <p className="loading">Loading your tickets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ticket-container">
        <div className="ticket-box">
          <p className="ticket-error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ticket-container">
      <div className="ticket-box header-box">
        <h1 className="ticket-title">My Tickets</h1>
        <p className="ticket-welcome">Welcome back, {user?.name}! Here are your booking tickets.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="ticket-box">
          <p className="ticket-message">You haven't booked any tickets yet.</p>
        </div>
      ) : (
        <div className="ticket-grid">
          {bookings.map((booking) => (
            <div key={booking.id} className="ticket-card">
              <div className="ticket-content">
                <h3 className="ticket-movie">{booking.show.movie.title}</h3>
                <p><strong>Show Time:</strong> {new Date(booking.show.show_time).toLocaleString()}</p>
                <p><strong>Seats:</strong> {booking.booked_seats.map((bs) => bs.seat.seat_number).join(", ")}</p>
                <p><strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
                <p><strong>Total Price:</strong> ${booking.total_price}</p>
                <span className="ticket-id">Booking ID: #{booking.id}</span>
              </div>

              {booking.show.movie.poster_image && (
                <div className="ticket-image">
                  <img src={booking.show.movie.poster_image} alt={booking.show.movie.title} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
