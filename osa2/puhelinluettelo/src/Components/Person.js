import React from 'react';



const Person = ({person, deletePersonInfo}) => {
    return (
        <li>
            {person.name} {person.number} <button onClick={() => deletePersonInfo(person.id)}>delete</button>
        </li>
);
}
 
export default Person;