import React, { useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import logo from "../assets/logo-t.png";
import { IoIosLogOut } from "react-icons/io";
import { getFavorites, clearFavorites } from "../features/FavoriteSlice"; 
import "../style/Navbar.css";

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const user = getUser();
  const loggedIn = !!user;

  useEffect(() => {
    if (user?._id) dispatch(getFavorites(user._id));
  }, [dispatch, user?._id]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(clearFavorites()); 
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

        {loggedIn ? (
          <>
            <li>
              <Link to="/profile">PROFILE</Link>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                <IoIosLogOut size={28} />
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <span className="guest-badge">GUEST</span>
            </li>
            <li>
              <Link to="/login" className="nav-login-btn">LOGIN</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;