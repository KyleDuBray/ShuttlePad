import React, { useState, useEffect } from "react";
import "../styles/weather.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocation } from "../actions";

const weatherStyles = {
  sunny: "sunny-outline",
  sunnyPartly: "partly-sunny-outline",
  cloudy: "cloudy-outline",
  rainy: "rainy-outline",
  storm: "thunderstorm-outline",
  night: "moon-outline",
  nightCloudy: "cloudy-night-outline",
  snow: "snow-outline",
};

const Weather = () => {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.condition);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    dispatch(fetchLocation());
    if (!weather) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (weather) {
      setLoading(false);
    } else setLoading(true);
  }, [weather]);

  useEffect(() => {}, [loading]);

  const renderWeatherUnits = () => {
    return !weather || Object.keys(weather).length === 0 ? null : <>&#176;F</>;
  };

  const renderWeatherIcon = () => {
    if (loading) return null;
    let currentWeather;
    try {
      currentWeather = weather.weather[0]?.description;
    } catch (err) {
      return null;
    }
    if (isDayTime()) {
      if (currentWeather.includes("storm")) {
        return weatherStyles.storm;
      } else if (
        currentWeather.includes("rain") ||
        currentWeather.includes("drizzle")
      ) {
        return weatherStyles.rainy;
      } else if (currentWeather.includes("snow")) {
        return weatherStyles.snow;
      } else if (currentWeather.includes("clear")) {
        return weatherStyles.sunny;
      } else if (currentWeather.includes("cloud")) {
        if (currentWeather.includes("scattered")) {
          return weatherStyles.cloudy;
        } else return weatherStyles.sunnyPartly;
      } else return weatherStyles.cloudy;
    } else {
      if (currentWeather.includes("storm")) {
        return weatherStyles.storm;
      } else if (
        currentWeather.includes("rain") ||
        currentWeather.includes("drizzle")
      ) {
        return weatherStyles.rainy;
      } else if (currentWeather.includes("clear")) {
        return weatherStyles.night;
      } else return weatherStyles.nightCloudy;
    }
  };

  const isDayTime = () => {
    if (loading) return null;
    const sys = weather?.sys;
    const sunriseTime = sys.sunrise * 1000;
    const sunsetTime = sys.sunset * 1000;
    const curTime = Date.now();
    if (curTime < sunriseTime || curTime > sunsetTime) {
      return false;
    } else return true;
  };

  return loading ? (
    <div className="weather-container">
      <h4>Loading...</h4>
    </div>
  ) : (
    <div className="weather-container">
      <div className="weather-city">
        <h4>{!weather ? null : weather.name}</h4>
      </div>
      <div className="weather-reporter">
        <ion-icon name={!weather ? null : renderWeatherIcon()}></ion-icon>
        <h4>
          {" "}
          {!weather.main ? null : Math.round(parseInt(weather.main?.temp))}
          {renderWeatherUnits()}
        </h4>
      </div>
    </div>
  );
};

export default Weather;
