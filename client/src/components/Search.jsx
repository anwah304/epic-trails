import React, { useEffect, useState } from "react";
import "../style/Search.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Reveal from "./Reveal";
import FavoriteButton from "./FavoriteButton"; 
import { TbMapSearch } from "react-icons/tb";

import { useDispatch, useSelector } from "react-redux";
import { getTrails } from "../features/TrailSlice";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const trails = useSelector((state) => state.trail.trails) || [];

  const [level, setLevel] = useState("");

  useEffect(() => {
    dispatch(getTrails());
  }, [dispatch]);

  const filteredTrails = level
    ? trails.filter((t) => t.level === level)
    : [];

  return (
    <>
      <Navbar />

      <div className="search-page">
        <div className="search-box">

          <div className="input-wrapper">

            <TbMapSearch className="search-icon" />

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Search by Level</option>
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
            </select>

          </div>

        </div>

        <div className="search-results">

          {level === "" ? (
            <p className="empty-text">Choose a level to search</p>
          ) : filteredTrails.length === 0 ? (
            <p className="empty-text">No trails found</p>
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

      <Footer />
    </>
  );
};

export default Search;