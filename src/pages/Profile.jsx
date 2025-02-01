import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css"; // Import CSS file

function Profile() {
  const [user, setUser] = useState(null);

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
    </div>
  );
}

export default Profile;
