import React from "react";
import "../Destination.css";
import Navbar from "./Navbar";
const Destination = () => {
  return (<>
  
  
    <Navbar />
    
    <div className="destination-page">

      <div className="destination-header">
        <h1>The Best Destination</h1>
        <p>
          Discover trails that lead you through mountains, valleys, and waterfalls,
          where every step tells a story.
        </p>
      </div>

      <div className="destination-cards">

        <div className="destination-card">
          <div className="card-img empty"></div>
          <h3>MUSCAT GOVERNORATE</h3>
        </div>

        <div className="destination-card">
          <div className="card-img empty"></div>
          <h3>AD DAKHILIYAH GOVERNORATE</h3>
        </div>

        <div className="destination-card">
          <div className="card-img empty"></div>
          <h3>DHOFAR GOVERNORATE</h3>
        </div>

      </div>
    </div>
  </>);
};

export default Destination;