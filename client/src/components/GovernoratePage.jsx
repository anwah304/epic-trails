import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTrails } from "../features/TrailSlice";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Reveal from "./Reveal";
import FavoriteButton from "./FavoriteButton"; 

const GovernoratePage = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const trails = useSelector((state) => state.trail.trails) || [];

  useEffect(() => {
    dispatch(getTrails());
  }, [dispatch]);

  const filteredTrails = trails.filter(
    (t) => t.governorate === name
  );

  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        <div className="dashboard-container">

          <div className="dashboard-header">
            <h1>{name.toUpperCase()}</h1>

            <p>
              Explore all trails in {name}
            </p>
          </div>

          <div className="dashboard-cards">

            {filteredTrails.length === 0 ? (
              <p className="empty-text">
                No trails in this governorate
              </p>
            ) : (
              filteredTrails.map((trail, i) => (
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

export default GovernoratePage;