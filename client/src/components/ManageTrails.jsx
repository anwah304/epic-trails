import React, { useEffect } from "react";
import "../style/Destination.css";
import AdminNavbar from "./AdminNavbar";
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
    dispatch(deleteTrail(id));
  };

  return (
    <>
      <AdminNavbar />

      <div className="dashboard-page">
        <div className="dashboard-container">

          <div className="dashboard-header">
            <h1>MANAGE TRAILS</h1>
            <p>Manage hiking trails in Oman</p>
            <button
              className="add-btn"
              onClick={() => navigate("/add-trail")}
            >
              + Add New Trail
            </button>
          </div>

          <div className="dashboard-cards">
            {trails.map((trail) => (
              <div className="dashboard-card" key={trail._id}>
                <img src={trail.image} alt={trail.name} />
                <div className="card-content">

                  <h3>
                    {trail.name.toUpperCase()} <br />
                    LEVEL : {trail.level}
                  </h3>

                  <div className="admin-actions">

                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/edit-trail/${trail._id}`)}
                    >
                      <FaRegEdit />
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(trail._id)}
                    >
                      <MdDeleteForever />
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default ManageTrails;