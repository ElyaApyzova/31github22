import React, { useState } from "react";
import axios from "axios";
import Normalize from "../main/normalize.css";
import Css from "../main/Weather.css";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "abc1fd4c1eb4a8738d1092b9599ed691";

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError("");
    } catch (error) {
      setWeatherData(null);
      setError("Not found");
    }
  };

  const getIcon = (iconCode) =>
    `http://openweathermap.org/img/w/${iconCode}.png`;

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeatherData}>Click</button>
      </div>
      {weatherData && (
        <div className="second-box">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}</p>
          <img src={getIcon(weatherData.weather[0].icon)} alt="" />
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed}m/s</p>
        </div>
      )}
      {error && (
        <p className="notFound" style={{ color: "#940B92" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default WeatherApp;
