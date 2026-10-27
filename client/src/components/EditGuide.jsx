import React, { useState, useEffect } from "react";
import "../style/AddTrail.css";
import AdminNavbar from "./AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editGuide } from "../features/GuideSlice";

import maleProfile from "../assets/male-profile.jpg";
import femaleProfile from "../assets/female-profile.png";

const EditGuide = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector((state) => state.guide.message);

  const guides = useSelector((state) => state.guide.guides);
  const guide = guides.find((g) => g._id === id);


  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");


  useEffect(() => {
    if (guide) {
      setName(guide.name);
      setSpecialty(guide.specialty);
      setPhone(guide.phone);
      setEmail(guide.email);
      setGender(guide.gender);
      setImage(guide.image);
      setDescription(guide.description || "");
    }
  }, [guide]);

 
  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    setGender(selectedGender);

    if (selectedGender === "Male") {
      setImage(maleProfile);
    } else if (selectedGender === "Female") {
      setImage(femaleProfile);
    } else {
      setImage("");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      id,
      name,
      specialty,
      phone,
      email,
      gender,
      image,
      description,
    };

    await dispatch(editGuide(updatedData));
    navigate("/admin/guides");
  };

  return (
    <>
      <AdminNavbar />
      <div className="add-trail-page">
        <div className="add-trail-box">

          <h1>Edit Guide</h1>

          <form onSubmit={handleSubmit}>

           
            <input
              type="text"
              placeholder="Guide Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          
            <input
              type="text"
              placeholder="Specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              required
            />

       
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

           
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

           
            <select
              value={gender}
              onChange={handleGenderChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

         
            {image && (
              <img
                src={image}
                alt="Profile"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "8px auto",
                  display: "block",
                }}
              />
            )}

         
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

         
            <button type="submit">Save Changes</button>

            <h3 className="trail-message">{message}</h3>

          </form>
        </div>
      </div>
    </>
  );
};

export default EditGuide;