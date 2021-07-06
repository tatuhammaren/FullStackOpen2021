import React, {useState, useEffect} from 'react';
import axios from 'axios';




const App = () => {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState('');
  const endpoint = 'https://restcountries.eu/rest/v2/all'
  
  useEffect(() => {
    axios
    .get(endpoint)
    .then ( response => {
      setCountries(response.data)
    })
  }, [])

  //

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setNewSearch(event.target.value);

  }

  return ( 
    <div>

    </div>

   );
}
 
export default App;
