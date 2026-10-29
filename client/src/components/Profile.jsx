import React, { useEffect, useState } from "react";
import "../style/Profile.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Reveal from "./Reveal";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom"; 
import { getTrails } from "../features/TrailSlice";
import { getGuides } from "../features/GuideSlice";

import maleProfile from "../assets/male-profile.jpg";
import femaleProfile from "../assets/female-profile.png";
import { FaMapMarkedAlt, FaUserTie, FaMountain, FaMale, FaFemale } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const CountUp = ({ value }) => {
  const [n, setN] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.ceil(value / 30));
    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        current = value;
        clearInterval(timer);
      }
      setN(current);
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return <>{n}</>;
};

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    return {};
  }
};

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const trails = useSelector((state) => state.trail.trails) || [];
  const guides = useSelector((state) => state.guide.guides) || [];

  const user = getStoredUser();
  const displayName =
    user.username || user.name || (user.email ? user.email.split("@")[0] : "Explorer");

  
  const isFemale = (user.gender || "").toLowerCase() === "female";
  const defaultAvatar = isFemale ? femaleProfile : maleProfile;
  const avatar = user.profilepic || defaultAvatar;

  useEffect(() => {
    dispatch(getTrails());
    dispatch(getGuides());
  }, [dispatch]);

  if (!user.email && !user._id) {
    return <Navigate to="/login" replace />;
  }

  const count = (lvl) => trails.filter((t) => t.level === lvl).length;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">
        
        <div className="profile-hero">
          <div className="profile-mountains" aria-hidden="true" />

          <div className="profile-avatar-wrap">
            <img
              src={avatar}
              alt={displayName}
              className="profile-avatar"
              onError={(e) => (e.target.src = defaultAvatar)}
            />
          </div>

          <h1 className="profile-name">{displayName}</h1>
          <p className="profile-email">{user.email || "—"}</p>

          <div className="profile-badges">
            <span className="profile-role">
              <FaMountain /> {user.role === "admin" ? "ADMIN" : "HIKER"}
            </span>

            {user.gender && (
              <span className="profile-gender">
                {isFemale ? <FaFemale /> : <FaMale />} {user.gender.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        
        <div className="profile-stats">
          <Reveal delay={0}>
            <div className="pstat">
              <FaMapMarkedAlt className="pstat-icon" />
              <h2><CountUp value={trails.length} /></h2>
              <p>Trails Available</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="pstat">
              <FaUserTie className="pstat-icon" />
              <h2><CountUp value={guides.length} /></h2>
              <p>Expert Guides</p>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="pstat">
              <FaMountain className="pstat-icon" />
              <h2><CountUp value={count("HARD")} /></h2>
              <p>Hard Challenges</p>
            </div>
          </Reveal>
        </div>

        
        <Reveal>
          <div className="profile-card">
            <h3>Trails by Difficulty</h3>

            {[
              { lvl: "EASY", cls: "easy" },
              { lvl: "MEDIUM", cls: "medium" },
              { lvl: "HARD", cls: "hard" },
            ].map(({ lvl, cls }) => {
              const pct = trails.length ? (count(lvl) / trails.length) * 100 : 0;
              return (
                <div className="level-row" key={lvl}>
                  <span className="level-label">{lvl}</span>
                  <div className="level-track">
                    <div
                      className={`level-fill ${cls}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="level-count">{count(lvl)}</span>
                </div>
              );
            })}
          </div>
        </Reveal>

        
        <Reveal>
          <div className="profile-actions">
            <button onClick={() => navigate("/search")}>FIND A TRAIL</button>
            <button onClick={() => navigate("/guides")}>MEET GUIDES</button>
            <button className="profile-logout" onClick={handleLogout}>
              <IoIosLogOut size={20} /> LOGOUT
            </button>
          </div>
        </Reveal>
      </div>

      <Footer />
    </>
  );
};

export default Profile;