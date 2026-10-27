import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTrails } from "../features/TrailSlice";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../style/TrailDetails.css";

const TrailDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const trail = useSelector((state) =>
    state.trail.trails.find((t) => t._id === id)
  );

  useEffect(() => {
    dispatch(getTrails());
  }, [dispatch]);

  if (!trail) {
    return (
      <>
        <Navbar />
        <div className="td-loading">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  // ✅ يستخدم lat/lng
  const getEmbedUrl = (lat, lng) => {
    if (!lat || !lng) return null;
    return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  };

  return (
    <>
      <Navbar />

      <div className="td-page">

        <div className="td-hero">

          <h1 className="td-title">{trail.name.toUpperCase()}</h1>

          <div className="td-hero-body">

            <div className="td-map-wrapper">
              {trail.lat && trail.lng ? (
                <iframe
                  title="Trail Location"
                  src={getEmbedUrl(trail.lat, trail.lng)}
                  width="100%"
                  height="100%"
                  style={{ border: "none", borderRadius: "12px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="td-no-map">No location available.</div>
              )}
            </div>

            <div className="td-description">
              <p className="td-desc-title">DESCRIPTION:</p>
              <p className="td-desc-text">
                {trail.description || "No description available."}
              </p>
              <div className="td-badges">
                <span className={`td-badge td-level-${trail.level.toLowerCase()}`}>
                  {trail.level}
                </span>
                <span className="td-badge td-gov">
                  📍 {trail.governorate}
                </span>
              </div>
            </div>

          </div>

        </div>

        <div className="td-back-wrapper">
          <button className="td-back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default TrailDetails;