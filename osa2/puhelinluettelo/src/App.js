import React, {  useState, useEffect } from 'react'
import PersonFilter from './Components/PersonFilter';
import PersonAddForm from './Components/PersonAddForm';
import NumberList from './Components/NumberList';
import axios from 'axios';

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')



useEffect(() =>{

  axios.get('http://localhost:3001/persons')
  .then(response => {
    setPersons(response.data);
  })

}, [])


  const handleAddPerson = (event) => {
    event.preventDefault();

    const nameExist = () => {
      return persons.filter(persons => persons.name === newName).length > 0;
    }
    console.log({persons})

    if (nameExist()) {
      alert(`${newName} is already added to phonebook`)
          } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length +1
      }
      setPersons(persons.concat(personObject));
    }
    setNewName('');
    setNewNumber('');
  }
  const handleNameChange = (event) => {
  //  console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
   // console.log(event.target.value);
    setNewNumber(event.target.value);
  }
  const handleFilterChange = (event) => {
   // console.log(event.target.value);
    setNewFilter(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <PersonFilter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add new</h3>
      <PersonAddForm addPerson={handleAddPerson} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}  newNumber={newNumber} />
      
      <h3>Numbers</h3>
      <ul>
        {/* {persons.map(person => <li key={person.name}>{person.name} {person.number}</li> )} */}
        <NumberList newFilter={newFilter} persons={persons} />
      </ul>
    </div>
  )

}

export default App