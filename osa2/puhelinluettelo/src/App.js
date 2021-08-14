import React, { useState, useEffect } from 'react'
import PersonFilter from './Components/PersonFilter';
import PersonAddForm from './Components/PersonAddForm';
import PersonList from './Components/PersonList';
import personsData from './services/personsData';
import NotificationMessage from './Components/NotificationMessage';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {

    /* axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data);
    }) */

    personsData
      .getAll()
      .then(personsList => {
        setPersons(personsList)
      })
  }, [])


  const handleAddPerson = (event) => {
    event.preventDefault();

    const nameExist = () => {
      return persons.filter(persons => persons.name === newName).length > 0;
    }
    //console.log({persons})

    if (nameExist()) {
      if (window.confirm(`${newName} is already added to phonebook. Do you want to replace the phone number with a new one`)) {
        console.log('täällä')
        const personToUpdate = persons.find(p => p.name === newName)
        //          console.log(personToUpdate)
        //        console.log(`${personToUpdate.name} ${personToUpdate.number} ${personToUpdate.id}` )

        personsData
          .update(personToUpdate.id, { ...personToUpdate, number: newNumber })
          .then(up => {
            setPersons(persons.map(p => p.id === up.id ? up : p))
            setSuccessMessage(`User ${personToUpdate.name} was updated succesfully`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`${personToUpdate.name}'s number update failed `)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })

      }

    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personsData
        .create(personObject)
        .then(personsList => {
          setPersons(persons.concat(personsList))
          setSuccessMessage(`User ${newName} was added succesfully`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          //console.log(error.response.data)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      setNewName('')
      setNewNumber('')


    }
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

  const deletePersonInfo = (id) => {
    const toBeDeleted = persons.filter(p => p.id === id)
    console.log(toBeDeleted)

    console.log('nappia painettu ', id)
    if (window.confirm(`Do you want to delete ${toBeDeleted[0].name}? `)) {
      personsData
        .removeData(id)
        .then(result => {
          setPersons(persons.filter(p => p.id !== id))
          setSuccessMessage(`User ${toBeDeleted[0].name} deletion succesfull`)
          console.log(`${id} poistettu`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)

        })
        .catch(error => {
          console.log('meidän pitäisi olla täällä')
          console.log(error)
          setErrorMessage(`Deletion of ${toBeDeleted[0].name} failed`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

      console.log(`${id} poistettu`)

    }

  }
  console.log(persons)
  return (
    <div>

      <h2>Phonebook</h2>
      <NotificationMessage successMsg={successMessage} errorMsg={errorMessage} />
      <PersonFilter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add new</h3>
      <PersonAddForm addPerson={handleAddPerson} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newNumber={newNumber} />

      <h3>Numbers</h3>
      {/* {persons.map(person => <li key={person.name}>{person.name} {person.number}</li> )} */}
      <PersonList persons={persons} deletePersonInfo={deletePersonInfo} />
    </div>
  )

}

export default App