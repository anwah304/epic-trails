import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toggleFavorite } from "../features/FavoriteSlice";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    return {};
  }
};

const FavoriteButton = ({ trailId, withLabel = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ids = useSelector((state) => state.favorite.ids);
  const isFav = ids.includes(trailId);

  const handleClick = (e) => {
    e.stopPropagation();

    const user = getStoredUser();

    if (!user._id) {
      navigate("/login");
      return;
    }

    dispatch(toggleFavorite({ userId: user._id, trailId }));
  };

  return (
    <button
      type="button"
      className={`fav-btn ${isFav ? "active" : ""} ${withLabel ? "fav-btn-label" : ""}`}
      onClick={handleClick}
      aria-pressed={isFav}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      title={isFav ? "Remove from favorites" : "Save to favorites"}
    >
      {isFav ? <FaHeart /> : <FaRegHeart />}
      {withLabel && <span>{isFav ? "SAVED" : "SAVE"}</span>}
    </button>
  );
};

export default FavoriteButton;