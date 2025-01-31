import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./css_component/Navbar.css";
import { FaSearch, FaTicketAlt, FaUser, FaBell, FaHome } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import logo from "./logo.png";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleProfileClick = () => {
    if (isAuthenticated) {
      // Navigate to the profile page if the user is authenticated
      navigate("/profile");
    } else {
      // Redirect to the login page if the user is not logged in
      navigate("/login");
    }
  };

  const handleLogoClick = () => {
    // Navigate to the home page when the logo is clicked
    navigate("/");
  };

  const handleLogoutClick = () => {
    logout();
    setIsMobileMenuOpen(false);
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
              />
            </div>

            <div className="logo" onClick={handleLogoClick}>
              <img src={logo} alt="logo" />
            </div>

            <div className="navbar-actions">
              <a href="/ticket" className="action-button glass-button">
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

            <div className="location-info">
              
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
