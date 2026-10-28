import React, { useEffect } from "react";
import "../style/Destination.css";

import AdminNavbar from "./AdminNavbar";
import Reveal from "./Reveal";    // ✅ جديد
import CountUp from "./CountUp";  // ✅ جديد
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getTrails, deleteTrail } from "../features/TrailSlice";
import { getGuides, deleteGuide } from "../features/GuideSlice";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // GET DATA FROM REDUX
  const trails = useSelector((state) => state.trail.trails) || [];
  const guides = useSelector((state) => state.guide.guides) || [];

  useEffect(() => {
    dispatch(getTrails());
    dispatch(getGuides());
  }, [dispatch]);

  // ✅ جديد: تأكيد قبل الحذف
  const handleDeleteTrail = (id) => {
    if (window.confirm("Delete this trail?")) dispatch(deleteTrail(id));
  };

  const handleDeleteGuide = (id) => {
    if (window.confirm("Delete this guide?")) dispatch(deleteGuide(id));
  };

  return (
    <>
      <AdminNavbar />

      <div className="dashboard-page">
        <div className="dashboard-container">

          <div className="dashboard-header">
            <h1>ADMIN DASHBOARD</h1>
            <p>Manage Trails & Guides in Oman</p>
          </div>

          <div className="stats-container">

            <Reveal delay={0}>
              <div className="stats-card">
                <FaMapMarkedAlt className="stats-icon" />
                <h2><CountUp value={trails.length} /></h2>
                <p>Total Trails</p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="stats-card">
                <FaUserTie className="stats-icon" />
                <h2><CountUp value={guides.length} /></h2>
                <p>Total Guides</p>
              </div>
            </Reveal>

          </div>

          <div className="dashboard-buttons">
            <button className="add-btn" onClick={() => navigate("/add-trail")}>
              + Add New Trail
            </button>
            <button className="add-btn" onClick={() => navigate("/add-guide")}>
              + Add New Guide
            </button>
          </div>

          <h2 className="section-title">Trails</h2>

          <div className="dashboard-cards">
            {trails.map((trail, i) => (
              <Reveal key={trail._id} delay={i * 80}> {/* ✅ جديد */}
                <div className="dashboard-card">
                  <img src={trail.image} alt={trail.name} />
                  <div className="card-content">
                    <h3>{trail.name}</h3>
                    {/* ✅ جديد: بادج ملوّن للمستوى */}
                    <span className={`level-pill ${(trail.level || "").toLowerCase()}`}>
                      {trail.level}
                    </span>

                    <div className="admin-actions">
                      <button
                        className="edit-btn"
                        title="Edit"
                        onClick={() => navigate(`/edit-trail/${trail._id}`)}
                      >
                        <FaRegEdit />
                      </button>

                      <button
                        className="delete-btn"
                        title="Delete"
                        onClick={() => handleDeleteTrail(trail._id)}
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <h2 className="section-title">Guides</h2>

          <div className="dashboard-cards">
            {guides.map((guide, i) => (
              <Reveal key={guide._id} delay={i * 80}> {/* ✅ جديد */}
                <div className="dashboard-card">
                  <img src={guide.image} alt={guide.name} />
                  <div className="card-content">
                    <h3>{guide.name}</h3>
                    <p>{guide.specialty}</p>

                    <div className="admin-actions">
                      <button
                        className="edit-btn"
                        title="Edit"
                        onClick={() => navigate(`/edit-guide/${guide._id}`)}
                      >
                        <FaRegEdit />
                      </button>

                      <button
                        className="delete-btn"
                        title="Delete"
                        onClick={() => handleDeleteGuide(guide._id)}
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminDashboard;