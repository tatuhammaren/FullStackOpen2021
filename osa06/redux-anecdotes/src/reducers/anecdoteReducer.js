import anecdoteService from '../services/anecdotes'

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updateAnecdote = await anecdoteService.vote({ ...anecdote, votes: anecdote.votes + 1 })
    // console.log(updateAnecdote)
    dispatch(
      {
        type: 'VOTE',
        data: updateAnecdote
      })
  }
}
export const createAnecdote= anecdote => {
  console.log('moi', anecdote)
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }

}
//const initialState = anecdotesAtStart.map(asObject)
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}
const reducer = (state = [], action) => {

  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'VOTE': {
    console.log('miksi et toimi???')
    const id = action.data.id
    return state.map(anecdote => anecdote.id ===  id ?  { ...anecdote, votes: anecdote.votes + 1 } : anecdote)
    //return state
  }
  case 'NEW_ANECDOTE': {
    // console.log(action.data)
    // console.log(action.data.content)
    return state.concat(action.data)
  }
  case 'INIT_ANECDOTES':
    return action.data
  default: return state
  }
}

export default reducer