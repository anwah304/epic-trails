import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-t.png";
import { IoIosLogOut } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import "../style/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo-section">
        <img src={logo} alt="Epic Trails Logo" className="logo-img" />
      </div>

      <ul className="nav-links">
        <li><Link to="/home">HOME</Link></li>
        <li><Link to="/search">SEARCH</Link></li>
        <li><Link to="/guides">GUIDES</Link></li>
        <li><Link to="/weather">WEATHER</Link></li>
        <li><Link to="/destinations">DESTINATIONS</Link></li>
        <li><Link to="/about">ABOUT</Link></li>
        <li>
          <Link to="/profile">PROFILE</Link>
        </li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            <IoIosLogOut size={28} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;