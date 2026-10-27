import React, { useEffect } from "react";
import "../style/Guides.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Reveal from "./Reveal"; // ✅ جديد

import { useDispatch, useSelector } from "react-redux";
import { getGuides } from "../features/GuideSlice";

const Guides = () => {
  const dispatch = useDispatch();

  const guides = useSelector((state) => state.guide.guides) || [];

  useEffect(() => {
    dispatch(getGuides());
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <div className="guides-page">

        <div className="guides-header">
          <h1>OUR GUIDES</h1>

          <p>
            Meet our professional hiking guides who will help you explore Oman’s
            most beautiful trails safely and confidently.
          </p>
        </div>

        <div className="guides-cards">

          {guides.length === 0 ? (
            <p className="empty-text">No guides available</p>
          ) : (
            guides.map((guide, i) => ( 
              <Reveal key={guide._id} delay={i * 80}> 
                <div className="guide-card"> 

                  <img
                    src={guide.image}
                    alt={guide.name}
                    className="guide-img"
                  />

                  <h3>{guide.name.toUpperCase()}</h3>

                  <p>{guide.specialty}</p>

                  <div className="contact-info">
                    <p> {guide.phone}</p>
                    <p>{guide.email}</p>
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

export default Guides;