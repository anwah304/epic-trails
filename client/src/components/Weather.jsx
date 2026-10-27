import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import {
  WiDaySunny,
  WiCloudy,
  WiHumidity,
  WiStrongWind
} from "react-icons/wi";

const GOVERNORATES = [
  { id: "muscat", name: "Muscat", temp: 34, condition: "Clear", humidity: 60, wind: 15 },
  { id: "dhofar", name: "Dhofar", temp: 29, condition: "Clouds", humidity: 70, wind: 10 },
  { id: "musandam", name: "Musandam", temp: 32, condition: "Clear", humidity: 55, wind: 20 },
  { id: "buraimi", name: "Al Buraimi", temp: 36, condition: "Clear", humidity: 40, wind: 12 },
  { id: "dakhliyah", name: "Ad Dakhiliyah", temp: 33, condition: "Clouds", humidity: 50, wind: 18 },
  { id: "batinah_n", name: "North Batinah", temp: 35, condition: "Clear", humidity: 65, wind: 14 },
  { id: "batinah_s", name: "South Batinah", temp: 34, condition: "Clear", humidity: 60, wind: 16 },
  { id: "sharqiyah_n", name: "North Sharqiyah", temp: 31, condition: "Clouds", humidity: 45, wind: 13 },
  { id: "sharqiyah_s", name: "South Sharqiyah", temp: 30, condition: "Clear", humidity: 50, wind: 11 },
  { id: "wusta", name: "Al Wusta", temp: 37, condition: "Clear", humidity: 35, wind: 22 },
  { id: "dhahirah", name: "Adh Dhahirah", temp: 35, condition: "Clear", humidity: 45, wind: 17 },
];

const WeatherCard = ({ gov }) => (
  <div className="wcard">
    <h3>{gov.name}</h3>
    <div className="wcard-icon">
      {gov.condition === "Clear" ? <WiDaySunny /> : <WiCloudy />}
    </div>
    <p className="wcard-temp">{gov.temp}°C</p>
    <p>{gov.condition}</p>
    <p><WiHumidity size={24} /> {gov.humidity}%</p>
    <p><WiStrongWind size={24} /> {gov.wind} km/h</p>
  </div>
);

const Weather = () => (
  <>
    <Navbar />
    <div className="weather-page">
      <h1 className="weather-title">Oman Weather</h1>
      <div className="weather-grid">
        {GOVERNORATES.map((gov) => (
          <WeatherCard key={gov.id} gov={gov} />
        ))}
      </div>
    </div>
    <Footer />
  </>
);

export default Weather;
