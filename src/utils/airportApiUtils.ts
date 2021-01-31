import { WeatherInfo } from '../types/airportDataTypes';

export const getWeatherURL = (lat: number, lon: number): string => {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=';
  const apiKey = '1f22d4f798f3fa7006bf7a2c8aec93c5';
  return `${baseUrl}${lat}&lon=${lon}&lang=en&appid=${apiKey}&units=metric`;
};

export const getWeatherIcon = (weatherInfo: WeatherInfo | null)
: string => ((weatherInfo) ? `https://openweathermap.org/img/wn/${weatherInfo.icon}.png` : '');

export const firstLogoUrl = (iata: string, icao: string): string => `https://cdn.flightradar24.com/assets/airlines/logotypes/${iata}_${icao}.png`;

export const secondLogoUrl = (iata: string): string => `https://content.airhex.com/content/logos/airlines_${iata}_60_20_r.png`