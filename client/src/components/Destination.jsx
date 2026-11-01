import React, { useEffect, useMemo, useState } from "react";
import "../style/Destination.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Reveal from "./Reveal";
import FavoriteButton from "./FavoriteButton";
import { FiMapPin, FiSearch, FiX } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { getTrails } from "../features/TrailSlice";
import { useNavigate } from "react-router-dom";

const LEVELS = ["ALL", "EASY", "MEDIUM", "HARD"];
const LEVEL_ORDER = { EASY: 1, MEDIUM: 2, HARD: 3 };

const SORTS = [
  { value: "name", label: "Name (A-Z)" },
  { value: "easy", label: "Difficulty: Easy first" },
  { value: "hard", label: "Difficulty: Hard first" },
  { value: "governorate", label: "Governorate (A-Z)" },
];

const shortName = (name = "") => name.replace(" Governorate", "");
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const byName = (a, b) => (a.name || "").localeCompare(b.name || "");

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    return {};
  }
};

const Destination = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const trails = useSelector((state) => state.trail.trails) || [];
  const favoriteIds = useSelector((state) => state.favorite.ids);
  const loggedIn = !!getStoredUser()._id;

  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("ALL");
  const [sort, setSort] = useState("name");
  const [savedOnly, setSavedOnly] = useState(false);

  useEffect(() => {
    dispatch(getTrails());
  }, [dispatch]);

  const governoratesCount = new Set(
    trails.map((t) => t.governorate).filter(Boolean)
  ).size;

  const levelCount = (lvl) =>
    lvl === "ALL" ? trails.length : trails.filter((t) => t.level === lvl).length;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = trails.filter((t) => {
      if (level !== "ALL" && t.level !== level) return false;
      if (savedOnly && !favoriteIds.includes(t._id)) return false;
      if (!q) return true;
      return [t.name, t.governorate, t.description]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(q));
    });

    return [...filtered].sort((a, b) => {
      if (sort === "easy") {
        return (LEVEL_ORDER[a.level] || 9) - (LEVEL_ORDER[b.level] || 9) || byName(a, b);
      }
      if (sort === "hard") {
        return (LEVEL_ORDER[b.level] || 0) - (LEVEL_ORDER[a.level] || 0) || byName(a, b);
      }
      if (sort === "governorate") {
        return (a.governorate || "").localeCompare(b.governorate || "") || byName(a, b);
      }
      return byName(a, b);
    });
  }, [trails, query, level, sort, savedOnly, favoriteIds]);

  const hasFilters = query.trim() !== "" || level !== "ALL" || savedOnly;

  const clearFilters = () => {
    setQuery("");
    setLevel("ALL");
    setSavedOnly(false);
  };

  const emptyMessage =
    trails.length === 0
      ? "No trails available yet."
      : savedOnly && favoriteIds.length === 0
      ? "You have not saved any trails yet."
      : "No trails match your search.";

  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        <div className="dashboard-container">

          <div className="dest-hero">
            <h1>ALL TRAILS</h1>
            <p>
              Search every hiking trail across Oman and filter by difficulty
              to find your next adventure.
            </p>
            <p className="dest-summary">
              {plural(trails.length, "trail", "trails")} across{" "}
              {plural(governoratesCount, "governorate", "governorates")}
            </p>
          </div>

          <div className="dest-toolbar">
            <div className="dest-search">
              <FiSearch className="dest-search-icon" />
              <input
                type="text"
                placeholder="Search by trail name or governorate"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search trails"
              />
              {query && (
                <button
                  type="button"
                  className="dest-clear"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>

            <div className="dest-controls">
              <div className="dest-chips" role="group" aria-label="Filter by difficulty">
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    className={`lvl-chip ${level === lvl ? "active" : ""}`}
                    onClick={() => setLevel(lvl)}
                  >
                    {lvl} <small>{levelCount(lvl)}</small>
                  </button>
                ))}
              </div>

              <div className="dest-right">
                {loggedIn && (
                  <button
                    type="button"
                    className={`saved-toggle ${savedOnly ? "active" : ""}`}
                    onClick={() => setSavedOnly((v) => !v)}
                    aria-pressed={savedOnly}
                  >
                    <FaHeart /> SAVED ONLY
                  </button>
                )}

                <label className="dest-sort">
                  Sort by
                  <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    {SORTS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>

          <p className="dest-count" role="status">
            {hasFilters
              ? `Showing ${results.length} of ${plural(trails.length, "trail", "trails")}`
              : plural(results.length, "trail", "trails")}
          </p>

          {results.length === 0 ? (
            <div className="dest-empty">
              <p>{emptyMessage}</p>
              {hasFilters && trails.length > 0 && (
                <button type="button" onClick={clearFilters}>
                  CLEAR FILTERS
                </button>
              )}
            </div>
          ) : (
            <div className="dashboard-cards">
              {results.map((trail, i) => (
                <Reveal key={trail._id} delay={Math.min(i, 8) * 80}>
                  <div className="dashboard-card">
                    <img src={trail.image} alt={trail.name} />

                    <span className={`level-pill card-level ${(trail.level || "").toLowerCase()}`}>
                      {trail.level}
                    </span>

                    <FavoriteButton trailId={trail._id} />

                    <div className="card-content">
                      <h3>{(trail.name || "").toUpperCase()}</h3>

                      <p className="card-gov">
                        <FiMapPin /> {shortName(trail.governorate)}
                      </p>

                      <p className="card-desc">
                        {trail.description || "No description available."}
                      </p>

                      <button onClick={() => navigate(`/trail/${trail._id}`)}>
                        DETAILS
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Destination;