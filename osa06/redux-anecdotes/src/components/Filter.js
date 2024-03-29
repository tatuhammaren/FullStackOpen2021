import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'
const Filter = (props) => {

  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    console.log(event.target.value)
    props.filterAnecdotes(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { filterAnecdotes })(Filter)