import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import API from '../services/API';

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
      const response = await API.get('/my-bookings');
      setBookings(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-center text-gray-600">Please log in to view your tickets.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-center">Loading your tickets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-center text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">My Tickets</h1>
        <p className="text-gray-600">
          Welcome back, {user?.name}! Here are your booking Tickeds.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-center text-gray-600">You haven't booked any tickets yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="relative bg-white shadow-sm rounded-lg overflow-hidden transform transition-transform hover:scale-102"
              style={{
                border: '2px dashed #e2e8f0',
                borderLeft: 'none',
                borderRight: 'none',
              }}
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gray-200 to-transparent"></div>
              <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-gray-200 to-transparent"></div>

              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-4">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {booking.show.movie.title}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Show Time:</span>{' '}
                      {new Date(booking.show.show_time).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium">Seats:</span>{' '}
                      {booking.booked_seats.map((bs) => bs.seat.seat_number).join(', ')}
                    </p>
                    <p>
                      <span className="font-medium">Booking Date:</span>{' '}
                      {new Date(booking.booking_date).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Total Price:</span> $
                      {booking.total_price}
                    </p>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Booking ID: #{booking.id}
                    </span>
                  </div>
                </div>

                {booking.show.movie.poster_image && (
                  <div className="w-full md:w-1/4 p-4 flex items-center justify-center bg-gray-100">
                    <img
                      src={booking.show.movie.poster_image}
                      alt={booking.show.movie.title}
                      className="w-24 h-32 object-cover rounded-lg shadow-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;