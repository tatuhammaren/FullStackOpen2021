const reducer = (state = '', action) => {
  switch (action.type) {
  case 'FILTER': {
    return action.input
  }
  default: return state
  }
}

export const filterAnecdotes = input => {
  return {
    type: 'FILTER',
    input
  }
}

export default reducer