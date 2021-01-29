import React, { useState, useEffect } from 'react';
import { WeatherProps, WeatherInfo, Temp } from '../../../types/airportDataTypes';
import { getWeatherURL, getWeatherIcon } from '../../../utils/airportApiUtils';
import './Weather.scss';

const Weather:React.FC<WeatherProps> = ({ airportInfo }:WeatherProps) => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [wind, setWind] = useState<{speed: number, deg: number} | null>(null);
  const [temp, setTemp] = useState<Temp | null>(null);

  useEffect(() => {
    fetch(getWeatherURL(airportInfo.position.latitude, airportInfo.position.longitude))
      .then((response) => response.json())
      .then((data) => {
        setWeatherInfo(data.weather[0]);
        setWind(data.wind);
        setTemp(data.main);
      });
  }, [airportInfo.position.latitude]);

  return (
    <div className="airport-weather">
      <div className="airport-weather__conditions">
        <span className="airport-weather_upperCase">CONDITIONS</span>
        <img src={getWeatherIcon(weatherInfo)} alt="weather-icon" />
        {weatherInfo && <span>{weatherInfo.description}</span>}
      </div>
      { temp && (
        <>
          <div className="airport-weather__temperature">
            <span className="airport-weather_upperCase">TEMPERATURE</span>
            <span className="airport-weather__degrees">
              {temp.temp.toFixed(0)}
              °C
            </span>
            <span className="airport-weather_upperCase">FEELS LIKE</span>
            <span>
              {temp.feels_like.toFixed(0)}
              °C
            </span>
          </div>
          <div className="airport-weather__wind">
            <span className="airport-weather_upperCase">WIND</span>
            <span>
              {wind.speed}
              m/s
            </span>
            <span className="airport-weather_upperCase">HUMIDITY</span>
            <span>
              {temp.feels_like}
              %
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
