import React from "react";
import { Link } from "react-router-dom";
import "../Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Epic Trails</h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/destination">Destination</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;