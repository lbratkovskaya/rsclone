import React, { useState, useEffect } from 'react';
import { TargetAirport } from '../../../types';
import './Weather.scss';

interface WeatherProps {
  targetAirport: TargetAirport
}

type WeatherInfo = {id:number, main:string, description: string, icon: string};
type Temp = {temp:number, 'feels_like':number, 'temp_min':number, 'temp_max':number, pressure:number, humidity:number, 'sea_level':number, 'grnd_level':number};
type Wind = {speed: number, deg: number};

const Weather:React.FC<WeatherProps> = ({ targetAirport }:WeatherProps) => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [wind, setWind] = useState<Wind | null>(null);
  const [temp, setTemp] = useState<Temp | null>(null);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${targetAirport.lat}&lon=${targetAirport.lon}&lang=en&appid=1f22d4f798f3fa7006bf7a2c8aec93c5&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherInfo(data.weather[0]);
        setWind(data.wind);
        setTemp(data.main);
      });
  }, [targetAirport.lat]);

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
      <div className="airport-weather__temprature">
        <span className="airport-weather_upperCase">TEMPERATURE</span>
        {temp ? (
          <span>
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
