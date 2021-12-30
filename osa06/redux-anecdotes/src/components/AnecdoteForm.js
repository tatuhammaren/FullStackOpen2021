import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotifcation } from '../reducers/notificationReducer'


const AnedcoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const data = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(data)
    props.showNotifcation(`added the anecdote '${data}' `, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default connect(null, { createAnecdote, showNotifcation })(AnedcoteForm)