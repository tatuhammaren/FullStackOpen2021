import React from 'react';
import WeatherData from './WeatherData';



const Country = ({country}) => {
    console.log({country})
    console.log(country.latlng[0])
    console.log(country.latlng[1])
    return (
    <div>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h2>languages</h2>
    <ul>
        {country.languages.map(language => 
        <li key={language.name}>
            {language.name}
        </li>
        )}
    </ul>
    <img src={country.flag} alt="Countrys flag"></img>
            
    <h2>Weather in {country.capital}</h2>
    <WeatherData lat={country.latlng[0]} lon={country.latlng[1]} />
    </div>
    )
}

export default Country