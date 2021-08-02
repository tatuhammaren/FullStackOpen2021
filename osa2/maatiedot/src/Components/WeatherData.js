import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = "https://api.openweathermap.org/data/2.5/onecall"
const EXCLUDE = "minutely,hourly,daily,alerts"
const IMG_URL =  "http://openweathermap.org/img/wn/"
const WeatherData = ({lat, lon}) => {

    const [weatherData, setWeatherData] = useState( [] )
   // console.log({lat, lon})
    useEffect(() =>{
        axios
        .get(`${API_URL}?lat=${lat}&lon=${lon}&exclude=${EXCLUDE}&appid=${API_KEY}&units=metric`)
        .then(response => {
          //  console.log(response.data)
            setWeatherData(response.data)
        })
    })
    return (
        <div>
        {weatherData.current.temp}
        </div>

    )
}

export default WeatherData