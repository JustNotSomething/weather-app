import React, { useEffect, useState } from 'react';
import './styles.css';

const Main = () => {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const apiKey = '5e82d39ed6f0d732f0bc2a21708b0695';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&exclude=hourly,daily&appid=${apiKey}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);

      const conditionToImage = {
        'Clouds': 'clouds.png',
        'Clear': 'sun.png',
        'Snow': 'snow.png',
        'Thunderstorm': 'thunderstorm.png',
        'Drizzle': 'drizzle.png',
        'Rain': 'rain.png',
        'Tornado': 'tornado.png',
        'Fog': 'fog.png',
        'Haze' : 'haze.png'
      };

      if (data.weather && data.weather.length > 0 && conditionToImage[data.weather[0].main]) {
        setBackgroundImage(conditionToImage[data.weather[0].main]);
      } else {
        setBackgroundImage('Default.webp');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (cityName.trim() !== '') {
      fetchWeatherData();
    }
  };

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="City"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button className="search-btn" type="button" onClick={handleSearch}>
          Find
        </button>
      </div>
      {loading ? (
        <p>Loading weather data...</p>
      ) : weatherData ? (
        <div className="block">
          <h1>
            {weatherData.name}, {weatherData.sys.country}
          </h1>
          <div className="date-center">
            <span className="date">{currentDate.toLocaleDateString()}</span>
          </div>
          <div className="weather-img">
            <img src={`/img/${backgroundImage}`} alt="" />
          </div>
          <div className="weather-disc">
            <span>{weatherData.weather[0].description}</span>
          </div>
          <h2>{(weatherData.main.temp - 273.15).toFixed(2)}°C</h2>
        </div>
      ) : (
        <p>Type city...</p>
      )}
    </div>
  );
};

export default Main;
