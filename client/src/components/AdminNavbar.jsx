import React from "react";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import logo from "../assets/logo-t.png";
import "../style/AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">

  
      <div className="admin-logo">
        <Link to="/admin">
          <img
            src={logo}
            alt="Admin Logo"
            className="admin-logo-img"
          />
        </Link>
      </div>

   
      <ul className="admin-nav-links">

        <li>
          <Link to="/admin">
            DASHBOARD
          </Link>
        </li>

        <li>
          <Link to="/admin/trails">
            MANAGE TRAILS
          </Link>
        </li>

        <li>
          <Link to="/admin/guides">
            MANAGE GUIDES
          </Link>
        </li>

        <li>
  <Link to="/" className="logout-link">
    <IoIosLogOut size={32}/>
  </Link>
</li>

      </ul>

    </nav>
  );
};

export default AdminNavbar;