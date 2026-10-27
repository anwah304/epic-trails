import React, { useEffect } from "react";
import "../style/Home.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Reveal from "./Reveal"; // ✅ جديد

import { useDispatch, useSelector } from "react-redux";
import { getTrails } from "../features/TrailSlice";
import { useNavigate } from "react-router-dom";

import Muscat from "../assets/Muscat.png";
import Dhofar from "../assets/Dhofar.png";
import Musandam from "../assets/Musandam.png";
import Alburaimi from "../assets/Alburaimi.png";
import AdDakhiliyah from "../assets/Ad Dakhiliyah.png";
import AlBatinahNorth from "../assets/Al Batinah North.png";
import AlBatinahSouth from "../assets/Al Batinah south.png";
import AshSharqiyahNorth from "../assets/Ash Sharqiyah North.png";
import AshSharqiyahSouth from "../assets/Ash Sharqiyah south.png";
import AlWusta from "../assets/Al Wusta.png";
import AdDhahirah from "../assets/Ad Dhahirah.png";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const trails = useSelector((state) => state.trail.trails) || [];

  useEffect(() => {
    dispatch(getTrails());
  }, [dispatch]);

  const governorates = [
    { name: "Muscat Governorate",                image: Muscat },
    { name: "Dhofar Governorate",                image: Dhofar },
    { name: "Musandam Governorate",              image: Musandam },
    { name: "Al Buraimi Governorate",            image: Alburaimi },
    { name: "Ad Dakhiliyah Governorate",         image: AdDakhiliyah },
    { name: "North Al Batinah Governorate",      image: AlBatinahNorth },
    { name: "South Al Batinah Governorate",      image: AlBatinahSouth },
    { name: "North Ash Sharqiyah Governorate",   image: AshSharqiyahNorth },
    { name: "South Ash Sharqiyah Governorate",   image: AshSharqiyahSouth },
    { name: "Al Wusta Governorate",              image: AlWusta },
    { name: "Adh Dhahirah Governorate",          image: AdDhahirah },
  ];

  return (
    <>
      <Navbar />

      <div className="destination-page">

        <div className="destination-header">
          <h1>The Best Destination</h1>
          <p>Discover trails across all governorates of Oman.</p>
        </div>

        <div className="destination-cards">

          {governorates.map((gov, index) => {

            const count = trails.filter(
              (t) => t.governorate === gov.name
            ).length;

            return (
              
              <Reveal key={index} delay={index * 80}>
                <div
                  className="destination-card" 
                  onClick={() => navigate(`/governorate/${gov.name}`)}
                  style={{ cursor: "pointer" }}
                >

                  <div className="card-img">
                    <img
                      src={gov.image}
                      alt={gov.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  <h3>{gov.name.toUpperCase()}</h3>

                  <p>{count} Trails</p>

                </div>
              </Reveal> 
            );
          })}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;