import React from 'react';



const Person = ({ person, deletePersonInfo }) => {
    return (
        <p>
            {person.name} {person.number} <button onClick={() => deletePersonInfo(person.id)}>delete</button>
        </p>
    );
}

export default Person;