import React, { useState } from "react";
import "../style/AddTrail.css";
import AdminNavbar from "./AdminNavbar";
import { addTrail } from "../features/TrailSlice";
import { useDispatch, useSelector } from "react-redux";

const AddTrail = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.trail.message);

  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trailData = {
      name,
      level,
      governorate,
      image,
      description,
      lat,
      lng,
    };

    dispatch(addTrail(trailData));

    setName("");
    setLevel("");
    setGovernorate("");
    setImage("");
    setDescription("");
    setLat("");
    setLng("");
  };

  return (
    <>
      <AdminNavbar />
      <div className="add-trail-page">
        <div className="add-trail-box">
          <h1>Add New Trail</h1>

          <form onSubmit={handleSubmit}>

            
            <input
              type="text"
              placeholder="Trail Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

           
            <select value={level} onChange={(e) => setLevel(e.target.value)} required>
              <option value="">Select Level</option>
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
            </select>

           
            <select value={governorate} onChange={(e) => setGovernorate(e.target.value)} required>
              <option value="">Select Governorate</option>
              <option value="Muscat Governorate">Muscat Governorate</option>
              <option value="Dhofar Governorate">Dhofar Governorate</option>
              <option value="Musandam Governorate">Musandam Governorate</option>
              <option value="Al Buraimi Governorate">Al Buraimi Governorate</option>
              <option value="Ad Dakhiliyah Governorate">Ad Dakhiliyah Governorate</option>
              <option value="North Al Batinah Governorate">North Al Batinah Governorate</option>
              <option value="South Al Batinah Governorate">South Al Batinah Governorate</option>
              <option value="North Ash Sharqiyah Governorate">North Ash Sharqiyah Governorate</option>
              <option value="South Ash Sharqiyah Governorate">South Ash Sharqiyah Governorate</option>
              <option value="Al Wusta Governorate">Al Wusta Governorate</option>
              <option value="Adh Dhahirah Governorate">Adh Dhahirah Governorate</option>
            </select>

           
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />

            
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

           
            <input
              type="text"
              placeholder="Latitude (e.g. 23.5880)"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />

            
            <input
              type="text"
              placeholder="Longitude (e.g. 58.3829)"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />

           
            <button type="submit">Add Trail</button>

            <h3 className="trail-message">{message}</h3>

          </form>
        </div>
      </div>
    </>
  );
};

export default AddTrail;