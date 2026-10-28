import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom"; // ✅ أضفنا NavLink و useNavigate
import { IoIosLogOut } from "react-icons/io";
import logo from "../assets/logo-t.png";
import "../style/AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate(); // ✅ جديد

  // ✅ جديد: تسجيل الخروج يمسح الجلسة (قبل كان يرجع للرئيسية بس)
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // ✅ جديد: يعلّم الرابط النشط
  const linkClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <nav className="admin-navbar">

      <div className="admin-logo">
        <Link to="/admin" className="admin-brand">
          <img src={logo} alt="Admin Logo" className="admin-logo-img" />
          <span className="admin-brand-text">EPIC TRAILS</span>
          <span className="admin-badge">ADMIN</span>
        </Link>
      </div>

      <ul className="admin-nav-links">
        <li>
          <NavLink to="/admin" end className={linkClass}>
            DASHBOARD
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/trails" className={linkClass}>
            MANAGE TRAILS
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/guides" className={linkClass}>
            MANAGE GUIDES
          </NavLink>
        </li>

        <li>
          <button className="admin-logout" onClick={handleLogout} title="Logout">
            <IoIosLogOut size={28} />
          </button>
        </li>
      </ul>

    </nav>
  );
};

export default AdminNavbar;