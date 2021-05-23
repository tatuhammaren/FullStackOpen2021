import React from 'react';
import Person from './Person'



const NumberList = ({ persons, newFilter }) => {
    return (
        <ul>
        {
            persons.filter( 
                person => person.name.toUpperCase().includes(newFilter.toUpperCase()))
                .map((person, i) => ( 
                    <Person key={i} name={person.name} number={person.number} /> ) ) 
            
        }
        </ul>
    )
}


export default NumberList