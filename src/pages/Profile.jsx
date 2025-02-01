import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import useAuth hook
import "./Profile.css"; // Import CSS file

function Profile() {
  const [user, setUser] = useState(null);
  const { logout } = useAuth(); // Use the logout function from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from storage
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/login"); // Redirect to the login page
  };

  if (!user) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <img 
        src="https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo-300x300.jpg" 
        alt="User Avatar" 
        className="profile-image"
      />
      <p className="profile-info"><strong>Name:</strong> {user.name}</p>
      <p className="profile-info"><strong>Email:</strong> {user.email}</p>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;