
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../style/Weather.css";

import {
  WiDaySunny,
  WiNightClear,
  WiCloudy,
  WiHumidity,
  WiStrongWind,
} from "react-icons/wi";

import { FiMapPin, FiRefreshCw, FiArrowLeft } from "react-icons/fi";

// WeatherAPI.com
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const GOVERNORATES = [
  {
    id: "muscat",
    name: "Muscat",
    arabic: "محافظة مسقط",
    city: "Muscat",
    lat: 23.588,
    lon: 58.383,
    wilayats: [
      "Muscat", "Muttrah", "Bawshar",
      "Seeb", "Al Amerat", "Quriyat",
    ],
  },
  {
    id: "dhofar",
    name: "Dhofar",
    arabic: "محافظة ظفار",
    city: "Salalah",
    lat: 17.019,
    lon: 54.089,
    wilayats: [
      "Salalah", "Taqah", "Mirbat",
      "Thumrait", "Sadah", "Rakhyut",
      "Dhalkut", "Muqshin", "Shaleem",
    ],
  },
  {
    id: "musandam",
    name: "Musandam",
    arabic: "محافظة مسندم",
    city: "Khasab",
    lat: 26.179,
    lon: 56.247,
    wilayats: ["Khasab", "Bukha", "Dibba", "Madha"],
  },
  {
    id: "buraimi",
    name: "Al Buraimi",
    arabic: "محافظة البريمي",
    city: "Al Buraimi",
    lat: 24.250,
    lon: 55.800,
    wilayats: ["Al Buraimi", "Mahdah", "As Sunaynah"],
  },
  {
    id: "dakhliyah",
    name: "Ad Dakhiliyah",
    arabic: "محافظة الداخلية",
    city: "Nizwa",
    lat: 22.933,
    lon: 57.533,
    wilayats: [
      "Nizwa", "Bahla", "Manah", "Al Hamra",
      "Adam", "Izki", "Samail", "Bidbid",
    ],
  },
  {
    id: "batinah_n",
    name: "North Al Batinah",
    arabic: "محافظة شمال الباطنة",
    city: "Sohar",
    lat: 24.342,
    lon: 56.729,
    wilayats: [
      "Sohar", "Shinas", "Liwa",
      "Saham", "Al Khaburah", "As Suwaiq",
    ],
  },
  {
    id: "batinah_s",
    name: "South Al Batinah",
    arabic: "محافظة جنوب الباطنة",
    city: "Rustaq",
    lat: 23.390,
    lon: 57.424,
    wilayats: [
      "Rustaq", "Barka", "Nakhal",
      "Wadi Al Maawil", "Al Awabi", "Al Musannah",
    ],
  },
  {
    id: "sharqiyah_n",
    name: "North Ash Sharqiyah",
    arabic: "محافظة شمال الشرقية",
    city: "Ibra",
    lat: 22.690,
    lon: 58.533,
    wilayats: [
      "Ibra", "Al Mudhaibi", "Bidiyah",
      "Al Qabil", "Wadi Bani Khalid", "Dima Wa Al Tayyin",
    ],
  },
  {
    id: "sharqiyah_s",
    name: "South Ash Sharqiyah",
    arabic: "محافظة جنوب الشرقية",
    city: "Sur",
    lat: 22.567,
    lon: 59.528,
    wilayats: [
      "Sur", "Jalan Bani Bu Ali",
      "Jalan Bani Bu Hassan",
      "Al Kamil Wal Wafi", "Masirah",
    ],
  },
  {
    id: "wusta",
    name: "Al Wusta",
    arabic: "محافظة الوسطى",
    city: "Haima",
    lat: 19.959,
    lon: 56.275,
    wilayats: ["Haima", "Duqm", "Mahout", "Al Jazer"],
  },
  {
    id: "dhahirah",
    name: "Adh Dhahirah",
    arabic: "محافظة الظاهرة",
    city: "Ibri",
    lat: 23.225,
    lon: 56.516,
    wilayats: ["Ibri", "Yanqul", "Dhank"],
  },
];

// طلب بيانات الطقس من WeatherAPI.com
async function fetchWeather(location) {
  if (!API_KEY) {
    throw new Error(
      "API key is missing. Check your .env file."
    );
  }

  const params = new URLSearchParams({
    key: API_KEY,
    q: `${location}, Oman`,
    aqi: "no",
  });

  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?${params}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error?.message || "Unable to load weather."
    );
  }

  return {
    location: data.location.name,
    temp: data.current.temp_c,
    feelsLike: data.current.feelslike_c,
    humidity: data.current.humidity,
    wind: data.current.wind_kph,
    condition: data.current.condition.text,
    icon: `https:${data.current.condition.icon}`,
    isDay: data.current.is_day === 1,
    localTime: data.location.localtime,
  };
}

function AnimatedWeather({ weather }) {
  const condition = weather.condition.toLowerCase();

  if (condition.includes("sunny") || condition.includes("clear")) {
    return weather.isDay ? (
      <WiDaySunny className="animated-sun" />
    ) : (
      <WiNightClear className="animated-sun" />
    );
  }

  if (
    condition.includes("rain") ||
    condition.includes("drizzle") ||
    condition.includes("shower")
  ) {
    return (
      <img
        className="weather-api-icon"
        src={weather.icon}
        alt={weather.condition}
      />
    );
  }

  return <WiCloudy className="animated-cloud" />;
}

function WeatherCard({ gov, weather, onClick, active }) {
  return (
    <button
      type="button"
      className={`governorate-card ${active ? "active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <span className="card-location">
        <FiMapPin />
        {gov.arabic}
      </span>

      <span className="card-weather-icon">
        {weather ? (
          <AnimatedWeather weather={weather} />
        ) : (
          <WiCloudy className="animated-cloud" />
        )}
      </span>

      <span className="card-temp">
        {weather ? `${Math.round(weather.temp)}°` : "--"}
        <small>C</small>
      </span>

      <span className="card-condition">
        {weather?.condition || "Loading weather..."}
      </span>

      <span className="card-bottom">
        <span>{weather ? `${weather.humidity}%` : "--"} humidity</span>
        <span>{weather ? `${Math.round(weather.wind)} km/h` : "--"}</span>
      </span>

      <span className="card-explore">
        Explore wilayats <span>↗</span>
      </span>
    </button>
  );
}

function WilayatCard({ place, weather, loading, error }) {
  return (
    <article className="wilayat-card">
      <div className="wilayat-heading">
        <span className="wilayat-pin">
          <FiMapPin />
        </span>
        <h3>{place}</h3>
      </div>

      {loading ? (
        <div className="weather-skeleton">
          <span />
          <span />
        </div>
      ) : error ? (
        <p className="weather-error">Weather unavailable</p>
      ) : weather ? (
        <>
          <div className="wilayat-main">
            <img src={weather.icon} alt={weather.condition} />
            <strong>{Math.round(weather.temp)}°C</strong>
          </div>

          <p className="wilayat-condition">{weather.condition}</p>

          <div className="wilayat-stats">
            <span>
              <WiHumidity /> {weather.humidity}%
            </span>
            <span>
              <WiStrongWind /> {Math.round(weather.wind)} km/h
            </span>
          </div>
        </>
      ) : (
        <p className="weather-error">No data available</p>
      )}
    </article>
  );
}

export default function Weather() {
  const [weatherData, setWeatherData] = useState({});
  const [selectedGov, setSelectedGov] = useState(null);
  const [wilayatWeather, setWilayatWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingWilayats, setLoadingWilayats] = useState(false);
  const [error, setError] = useState("");
  const [wilayatError, setWilayatError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (selectedGov) {
      document.getElementById("wilayats")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedGov]);

  async function loadGovernorates() {
    setError("");
    setLoading(true);

    try {
      const results = await Promise.all(
        GOVERNORATES.map(async (gov) => {
          const weather = await fetchWeather(gov.city);
          return [gov.id, weather];
        })
      );

      setWeatherData(Object.fromEntries(results));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGovernorates();
  }, []);

  async function handleSelectGovernorate(gov) {
    setSelectedGov(gov);
    setWilayatError("");

    const cached = wilayatWeather[gov.id];

    if (cached) return;

    setLoadingWilayats(true);

    try {
      const results = await Promise.all(
        gov.wilayats.map(async (place) => {
          try {
            const weather = await fetchWeather(place);
            return [place, { weather, error: false }];
          } catch (err) {
            console.error(`Weather failed for ${place}:`, err);
            return [place, { weather: null, error: true }];
          }
        })
      );

      setWilayatWeather((previous) => ({
        ...previous,
        [gov.id]: Object.fromEntries(results),
      }));

      if (results.every(([, result]) => result.error)) {
        setWilayatError(
          "Could not load weather for this governorate."
        );
      }
    } catch {
      setWilayatError("Unable to load wilayat weather.");
    } finally {
      setLoadingWilayats(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    setWilayatWeather({});

    try {
      await loadGovernorates();

      if (selectedGov) {
        await handleSelectGovernorate(selectedGov);
      }
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="weather-page">
        <section className="weather-hero">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />

          <div className="hero-content">
            <span className="hero-eyebrow">
              <span className="live-dot" />
              LIVE WEATHER · OMAN
            </span>

            <h1>
              Explore the <span>Weather</span>
              <br />
              Across Oman
            </h1>

            <p>
              Discover the weather in every corner of our beautiful country.
              Select a governorate to explore its wilayats.
            </p>

            <div className="hero-actions">
              <a href="#governorates" className="hero-button">
                Explore locations <span>↓</span>
              </a>

              <button
                type="button"
                className="refresh-button"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <FiRefreshCw
                  className={refreshing ? "spin" : ""}
                />
                Refresh
              </button>
            </div>
          </div>

          <div className="hero-weather-art" aria-hidden="true">
            <div className="sun-halo">
              <WiDaySunny />
            </div>
            <div className="hero-cloud">
              <WiCloudy />
            </div>
            <span className="hero-star star-one">✦</span>
            <span className="hero-star star-two">✧</span>
          </div>

          <div className="hero-footer">
            <span>OMAN · ARABIAN PENINSULA</span>
            <span>Weather powered by WeatherAPI.com</span>
          </div>
        </section>

        <section className="governorates-section" id="governorates">
          <div className="section-heading">
            <div>
              <span className="section-kicker">DISCOVER OMAN</span>
              <h2>Weather by Governorate</h2>
              <p>Select any card to discover its wilayats.</p>
            </div>

            <span className="location-count">
              <FiMapPin /> 11 Governorates
            </span>
          </div>

          {loading && (
            <div className="weather-message" role="status">
              <WiDaySunny className="animated-sun" />
              <p>Gathering the latest weather across Oman...</p>
            </div>
          )}

          {error && (
            <div className="weather-message error-message" role="alert">
              <p>{error}</p>
              <button onClick={loadGovernorates}>Try again</button>
            </div>
          )}

          {!loading && !error && (
            <div className="governorate-grid">
              {GOVERNORATES.map((gov) => (
                <WeatherCard
                  key={gov.id}
                  gov={gov}
                  weather={weatherData[gov.id]}
                  active={selectedGov?.id === gov.id}
                  onClick={() => handleSelectGovernorate(gov)}
                />
              ))}
            </div>
          )}
        </section>

        {selectedGov && (
          <section className="wilayats-section" id="wilayats">
            <div className="wilayats-title">
              <div>
                <span className="section-kicker">EXPLORE THE REGION</span>
                <h2>{selectedGov.arabic}</h2>
                <p>
                  Current weather in the wilayats of {selectedGov.name}.
                </p>
              </div>

              <button
                type="button"
                className="back-button"
                onClick={() => setSelectedGov(null)}
              >
                <FiArrowLeft /> Close
              </button>
            </div>

            {wilayatError && (
              <p className="weather-error" role="alert">
                {wilayatError}
              </p>
            )}

            <div className="wilayat-grid">
              {selectedGov.wilayats.map((place) => {
                const result =
                  wilayatWeather[selectedGov.id]?.[place];

                return (
                  <WilayatCard
                    key={place}
                    place={place}
                    weather={result?.weather}
                    error={result?.error}
                    loading={loadingWilayats && !result}
                  />
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
