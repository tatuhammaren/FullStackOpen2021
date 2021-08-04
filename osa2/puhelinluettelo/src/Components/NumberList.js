import React from 'react';
import Person from './Person'



const NumberList = ({ persons, newFilter, deletePersonInfo }) => {
    return (
        <ul>
        {
            persons.filter( 
                person => person.name.toUpperCase().includes(newFilter.toUpperCase()))
                .map((person, i) => ( 
                    <Person key={i} person={person} deletePersonInfo={deletePersonInfo} />  ) ) 
            
        }
        </ul>
    )
}


export default NumberList