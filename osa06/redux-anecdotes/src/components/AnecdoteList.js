import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotifcation } from '../reducers/notificationReducer'

const  AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const f = state.filter
    const anecdotes = state.anecdotes
    if(f === '') return anecdotes
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(f.toLowerCase()) > -1)
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('voting', anecdote)
    dispatch(showNotifcation(`+1 for  the anecdote '${anecdote.content}`))
    dispatch(voteAnecdote(anecdote.id))
    setTimeout(() => {
      showNotifcation(null)
    }, 5000)
  }


  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(
          anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
            has {anecdote.votes} votes
                <button onClick={() => vote(anecdote)}>+1</button>
              </div>
            </div>
        )}
    </div>
  )
}

export default AnecdoteList