import React, { useEffect } from "react";
import "../style/Destination.css";
import AdminNavbar from "./AdminNavbar";
import Reveal from "./Reveal"; // ✅ جديد
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getGuides, deleteGuide } from "../features/GuideSlice";

const ManageGuides = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const guides = useSelector((state) => state.guide.guides || []);

  useEffect(() => {
    dispatch(getGuides());
  }, [dispatch]);

  // ✅ جديد: تأكيد قبل الحذف
  const handleDelete = (id) => {
    if (window.confirm("Delete this guide?")) dispatch(deleteGuide(id));
  };

  return (
    <>
      <AdminNavbar />
      <div className="dashboard-page">
        <div className="dashboard-container">

          <div className="dashboard-header">
            <h1>MANAGE GUIDES</h1>
            <p>Manage hiking guides in Oman</p>
            <button className="add-btn" onClick={() => navigate("/add-guide")}>
              + Add New Guide
            </button>
          </div>

          <div className="dashboard-cards">
            {guides.length === 0 ? (
              <p className="empty-text">No guides yet</p>
            ) : (
              guides.map((guide, i) => (
                <Reveal key={guide._id} delay={i * 80}> {/* ✅ جديد */}
                  <div className="dashboard-card">
                    <img src={guide.image} alt={guide.name} />
                    <div className="card-content">

                      <h3>{guide.name.toUpperCase()}</h3>
                      <p className="guide-specialty">{guide.specialty}</p>

                      <div className="contact-info">
                        <p>📞 {guide.phone}</p>
                        <p>📧 {guide.email}</p>
                      </div>

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
                          onClick={() => handleDelete(guide._id)}
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

export default ManageGuides;