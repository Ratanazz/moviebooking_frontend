import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./css_component/Navbar.css";
import { FaSearch, FaTicketAlt, FaUser, FaBell, FaHome } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import logo from "./logo.png";
import API from "../services/API"; 

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // state for search query
  const [searchResults, setSearchResults] = useState([]); // state to store search results

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogoutClick = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  // Handle search query change
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) { // Only trigger the search after 2 characters
      try {
        const response = await API.get(`/movies`, {
          params: {
            search: query, // Assuming your API can handle search parameters
          },
        });
        setSearchResults(response.data); // Store results in state
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]); // Clear results on error
      }
    } else {
      setSearchResults([]); // Clear results when query is empty or too short
    }
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-top">
            <div className="search-container glass-button">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search Movies..."
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange} // Update query on input change
              />
              {/* Optionally, you can display search results here */}
              {searchResults.length > 0 && (
                <div className="search-results">
                  <ul>
                    {searchResults.map((movie) => (
                      <li key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
                        {movie.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="logo" onClick={handleLogoClick}>
              <img src={logo} alt="logo" />
            </div>

            <div className="navbar-actions">
              <a href="/myticket" className="action-button glass-button">
                <FaTicketAlt /> Ticket
              </a>
              <button
                className="action-button profile-button glass-button"
                onClick={handleProfileClick}
              >
                <FaUser /> Profile
              </button>
              <a href="/notifications" className="icon-button glass-button">
                <FaBell />
              </a>
            </div>
          </div>

          <div className="navbar-bottom">
            <ul className="nav-menu">
              <li className="nav-item active">
                <a href="/" className="glass-button">
                  <FaHome className="nav-icon" /> Home
                </a>
              </li>
              <li className="nav-item">
                <a href="/cinemas" className="glass-button">
                  <FiMapPin className="nav-icon" /> Cinemas
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
