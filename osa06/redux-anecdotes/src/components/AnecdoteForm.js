import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotifcation } from '../reducers/notificationReducer'


const AnedcoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const data = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(data))
    dispatch(showNotifcation(`added the anecdote '${data}' `))
    setTimeout(() => {
      dispatch(showNotifcation(null))
    }, 5000)
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

export default AnedcoteForm