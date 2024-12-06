import React from 'react'
import './css_component/Navbar.css'
function Navbar() {
  return (
    <nav className="navbar">
      
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="myticket">My Tickets</a></li>
        <li><a href="movie">Movie</a></li>
        <li><a href="profile">profile</a></li>
      </ul>
    </nav>
  );
}
export default Navbar;
