import React from 'react'

const Header = ( { header } ) => {
    return (
      <div>
      <h1>{ header }</h1>
      </div>
    )
  }
  const Content = ( { parts } ) => {
    return (
        <ul>
            {parts.map(part => 
                <Part part={ part.name } exercises = { part.exercises } />
           )}
        </ul>

    )
  }

const Part = ({part, exercises}) => {
    return (
      <p>{part} {exercises}</p>
      
    )
}
const TotalParts = ({ parts }) => {
    const exCount = parts.reduce( ( sum, parts ) => sum + parts.exercises, 0 )
    return (
        <b>
            Count of exercises is {exCount}
        </b>
    )
}
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const Course = ( { course }) => {
    return (
        <div>
            <Header header={course.name} />
            <Content parts={course.parts} />
            <TotalParts parts={course.parts} />
        </div>
    )
}


export default Course