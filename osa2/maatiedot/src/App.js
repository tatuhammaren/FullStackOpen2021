import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Countries from './Components/Countries';
//import Country from './Components/Country';


const App = () => {
const API_URL = "https://restcountries.eu/rest/v2/all";

const [countries, setCountries]  = useState( [ ] )
const [filteredCountries, setFilteredCountries]  = useState( [ ] )
const [search, setSearch] = useState( '' )

useEffect(() =>{
  axios
  .get( API_URL )
  .then( response => {
    setCountries(response.data)
  } )
  
}, []);

const handleSearchChange = (e) => {
 // console.log(e.target.value)
  setSearch(e.target.value)
  const filterCountries = countries
                        .filter((country ) => 
                        country.name.toLowerCase()
                        .includes(search.toLowerCase()));

  setFilteredCountries(filterCountries)
}

  return (
    <div>
    <form>
    <div>
    find countries <input onChange={handleSearchChange} />
    </div>
    </form>
    <Countries countries={filteredCountries} setCountries={setFilteredCountries} />
    </div>
  );
  }

export default App;
