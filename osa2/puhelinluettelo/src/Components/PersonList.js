import React from 'react';
import Person from './Person'



const PersonList = ({ persons, deletePersonInfo }) => {


    return (
        <ul>
            {persons.map((person, i) =>
                <li key={person.id} ><Person person={person} deletePersonInfo={deletePersonInfo} /></li>
            )}
        </ul>






    )
}

export default PersonList