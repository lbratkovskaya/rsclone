import React, { useState, useEffect } from 'react';
import { WeatherProps, WeatherInfo, Temp } from '../../../types/airportDataTypes';
import getWeatherUrl from '../../../utils/airportApiUtils';
import './Weather.scss';

const Weather:React.FC<WeatherProps> = ({ airportInfo }:WeatherProps) => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [wind, setWind] = useState<{speed: number, deg: number} | null>(null);
  const [temp, setTemp] = useState<Temp | null>(null);

  useEffect(() => {
    fetch(getWeatherUrl(airportInfo.position.latitude, airportInfo.position.longitude))
      .then((response) => response.json())
      .then((data) => {
        setWeatherInfo(data.weather[0]);
        setWind(data.wind);
        setTemp(data.main);
      });
  }, [airportInfo.position.latitude]);

  let url;
  if (weatherInfo) {
    url = `https://openweathermap.org/img/wn/${weatherInfo.icon}.png`;
  }

  return (
    <div className="airport-weather">
      <div className="airport-weather__conditions">
        <span className="airport-weather_upperCase">CONDITIONS</span>
        <img src={url} alt="weather-icon" />
        {weatherInfo ? <span>{weatherInfo.description}</span> : null}
      </div>
      <div className="airport-weather__temperature">
        <span className="airport-weather_upperCase">TEMPERATURE</span>
        {temp ? (
          <span className="airport-weather__degrees">
            {temp.temp.toFixed(0)}
            °C
          </span>
        ) : null}
        <span className="airport-weather_upperCase">FEELS LIKE</span>
        {temp ? (
          <span>
            {temp.feels_like.toFixed(0)}
            °C
          </span>
        ) : null}
      </div>
      <div className="airport-weather__wind">
        <span className="airport-weather_upperCase">WIND</span>
        {temp ? (
          <span>
            {wind.speed}
            m/s
          </span>
        ) : null}
        <span className="airport-weather_upperCase">HUMIDITY</span>
        {temp ? (
          <span>
            {temp.feels_like}
            %
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Weather;
