const getWeatherURL = (lat: number, lon: number): string => {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=';
  const apiKey = '1f22d4f798f3fa7006bf7a2c8aec93c5';
  return `${baseUrl}${lat}&lon=${lon}&lang=en&appid=${apiKey}&units=metric`;
};

export default getWeatherURL;
