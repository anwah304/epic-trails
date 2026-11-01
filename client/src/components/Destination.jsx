import React, { useEffect } from "react";
import "../style/Destination.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Reveal from "./Reveal";
import FavoriteButton from "./FavoriteButton"; 

import { useDispatch, useSelector } from "react-redux";
import { getTrails } from "../features/TrailSlice";
import { useNavigate } from "react-router-dom";

const Destination = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const trails = useSelector((state) => state.trail.trails) || [];

  useEffect(() => {
    dispatch(getTrails());
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        <div className="dashboard-container">

          <div className="dashboard-header">
            <h1>MUSCAT GOVERNORATE</h1>

            <p>
              Explore breathtaking trails, coastal views, and hidden natural
              gems across Oman.
            </p>
          </div>

          <div className="dashboard-cards">
            {trails.length === 0 ? (
              <p className="empty-text">No trails available</p>
            ) : (
              trails.map((trail, i) => (
                <Reveal key={trail._id} delay={i * 80}>
                  <div className="dashboard-card">
                    <img src={trail.image} alt={trail.name} />

                    <FavoriteButton trailId={trail._id} /> 

                    <div className="card-content">
                      <h3>
                        {trail.name.toUpperCase()} <br />
                        LEVEL : {trail.level}
                      </h3>

                      <button onClick={() => navigate(`/trail/${trail._id}`)}>
                        DETAILS
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Destination;