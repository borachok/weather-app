import React, { useState, useEffect} from 'react';
import axios from "axios";
import './weatherApp.scss'

const api = {
  key: 'ae32f454ef5dd8e7a9ee217f4a88ba07',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function WeatherApp() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

   const getGeolocation = () => {
    let location = 'Ukraine, Lviv';
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json`,{
      params: {
        address: location,
        key: 'AIzaSyBXsrgX-0OzPgfIcclmRfIJmfnqTqcTc9U'
      }
    })
      .then((res) => {
        let curLocation = res.data.results[0].formatted_address.split(',')[0];
        fetch(`${api.base}weather?q=${curLocation}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
          });

      })
  }

  const getWeather = e => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  useEffect(() => {
    getGeolocation();
  },[])

  return (
    <>
        <div className="main">
          <div className="form__group field">
            <input
              type="text"
              className='form__field'
              placeholder='Search...'
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={getWeather}
            />
          </div>
          {(typeof  weather.main != 'undefined') ? (
            <>
              <div className="location-container">
                <div className="location-name">{weather.name}, {weather.sys.country}</div>
              </div>
              <div className="weather-container">
                <div className="weather">{weather.weather[0].main}</div>
                <div className={(weather.main.temp <= 0) ? ' temperature coldBg' : 'temperature warmBg'}>
                  {Math.round(weather.main.temp)}°c
                </div>
              </div>
            </>
          ) : ('')}
        </div>
    </>
  );
}

export default WeatherApp;
