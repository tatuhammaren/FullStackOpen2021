import React, {useState, useEffect} from 'react';
import axios from 'axios';


const App = () => {
const API_URL = "https://restcountries.eu/rest/v2/all";
const [countries, setCountries] = useState([])


useEffect(() =>{
    axios
    .get(API_URL)
    .then(response => {
      setCountries(response.data)
    } )
    
}, []);

console.log(countries.length)


  return (
    <p>

    </p>
  );
}

export default App;
