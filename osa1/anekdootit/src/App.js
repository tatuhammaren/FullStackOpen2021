import React, { useState } from 'react'

const Anecdote = ({ ane, votes}) => {

// console.log({ane})
// console.log({votes})
  return (
    <div>
      <p>{ane}</p>
      <p>has {votes} votes </p>
    </div>

  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
console.log({anecdotes})
  console.log({votes})

  const VoteAnecdote = () => {
      const votesCopy = [...votes]
      votesCopy[selected] +=  1
      setVotes(votesCopy)
  }


let MostVotes =  votes.indexOf(Math.max.apply(Math, votes))

  const SetNextAnecdote = () => {  
   let nextIndex = selected
    while (nextIndex === selected) 
    {
       nextIndex=  Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(nextIndex)
  }

  console.log({selected})
  return (
    <div>
    <h1>Anecdote of the day</h1>
    <Anecdote  ane={anecdotes[selected]} votes={votes[selected]} />

    <button onClick={() => SetNextAnecdote()} >next anecdote</button>
    <button onClick={() => VoteAnecdote()} >vote</button>
    
    <h1>Anecdote with most votes</h1>
    <Anecdote  ane={anecdotes[MostVotes]} votes={votes[MostVotes]} />
    </div>
  )
}

export default App