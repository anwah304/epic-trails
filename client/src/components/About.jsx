import React from "react";
import "../style/About.css";
import Navbar from "./Navbar";

import aboutImg from "../assets/aboutImg.jpg";
import Footer from "./Footer";

const About = () => {
  return (
    <>
      <Navbar />

      <div className="about">

        <img src={aboutImg} alt="" />

        <div className="about-text">

          <h1>ABOUT US</h1>

          <p>
            Epic Trails is a web-based platform dedicated to exploring hiking
            trails in the Sultanate of Oman.
          
            It provides users with a comprehensive guide to the most beautiful
            natural destinations across different governorates.
        
            Users can browse trails by location and discover detailed
            information about each trail.
          </p>

        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default About;