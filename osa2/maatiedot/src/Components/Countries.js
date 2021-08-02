import React from 'react';
import Country from './Country';




const Countries = ({countries, setCountries}) => {

    if (countries.length > 10  ) {
        return (
          <div>
    
          <p> Aievan liikaa maita</p>
          </div>
        )
      }
      else if ((countries.length < 10 && countries.length >= 2) || countries.length === 0) {
        return (
          countries.map((country, i) => 
          <li key={i}>
          {country.name} <button onClick={() => setCountries([country])}>Show</button>
          </li>)
        )
      }
      else {
        return (
          <Country country={countries[0]} />
        )
    
      }

}

export default Countries