import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; 
const BeachDetail = () => {
  const { name } = useParams();
  const [beach, setBeach] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  const apiKey = '4faf2c1ae62ce0ae875b12545ff9ad4'; 

  useEffect(() => {
 
    axios.get(`http://localhost:5000/api/beaches/${name}`)
      .then(response => {
        const beachData = response.data;
        setBeach(beachData);
        const fetchWeather = async () => {
          setLoadingWeather(true);
          setWeatherError(null);
          try {
            const weatherResponse = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${beachData.wlocation}&appid=${apiKey}&units=metric`
            );
            console.log(weatherResponse);
            setWeather(weatherResponse.data);
          } catch (err) {
            setWeatherError('Failed to fetch weather data');
          } finally {
            setLoadingWeather(false);
          }
        };

        fetchWeather();
      })
      .catch(error => console.error('Error fetching beach details:', error));
  }, [name]);

  if (!beach) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1>{beach.name}</h1>
        <p>{beach.description}</p>
        <p>Location: {beach.location}</p>
        <div className="row mb-4">
          <iframe
            src={beach.glocation}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map of Beach Location"
          ></iframe>
        </div>

     
        <div className="mt-4 mb-3">
          <h2>Weather Report for {beach.wlocation}</h2>
          {loadingWeather && <div className="alert alert-info">Loading weather...</div>}
          {weatherError && <div className="alert alert-danger">{weatherError}</div>}
          {weather && (
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">{weather.name}</h5>
                <div className="d-flex align-items-center">
                  <img 
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                    alt={weather.weather[0].description}
                    className="me-3"
                  />
                  <div>
                    <p className="card-text">Temperature: {weather.main.temp}°C</p>
                    <p className="card-text">Weather: {weather.weather[0].description}</p>
                    <p className="card-text">Humidity: {weather.main.humidity}%</p>
                    <p className="card-text">Wind Speed: {weather.wind.speed} m/s</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BeachDetail;
