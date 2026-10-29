import React, { useEffect } from "react";
import "../style/Destination.css";
import AdminNavbar from "./AdminNavbar";
import Reveal from "./Reveal"; 
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getTrails, deleteTrail } from "../features/TrailSlice";

const ManageTrails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trails = useSelector((state) => state.trail.trails || []);

  useEffect(() => {
    dispatch(getTrails());
  }, [dispatch]);

 
  const handleDelete = (id) => {
    if (window.confirm("Delete this trail?")) dispatch(deleteTrail(id));
  };

  return (
    <>
      <AdminNavbar />

      <div className="dashboard-page">
        <div className="dashboard-container">

          <div className="dashboard-header">
            <h1>MANAGE TRAILS</h1>
            <p>Manage hiking trails in Oman</p>
            <button className="add-btn" onClick={() => navigate("/add-trail")}>
              + Add New Trail
            </button>
          </div>

          <div className="dashboard-cards">
            {trails.length === 0 ? (
              <p className="empty-text">No trails yet</p>
            ) : (
              trails.map((trail, i) => (
                <Reveal key={trail._id} delay={i * 80}> 
                  <div className="dashboard-card">
                    <img src={trail.image} alt={trail.name} />
                    <div className="card-content">

                      <h3>{trail.name.toUpperCase()}</h3>
                      <span className={`level-pill ${(trail.level || "").toLowerCase()}`}>
                        {trail.level}
                      </span>
                      <p>{trail.governorate}</p>

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
                          onClick={() => handleDelete(trail._id)}
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default ManageTrails;