import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient} from '@apollo/client'
import RecommendedBooks  from './components/RecommendedBooks'
const App = () => {
  const [page, setPage] = useState('books')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  useEffect(() => {
    const t = localStorage.getItem('library-token')
    if(!t) return null
    setToken(t)
  },[])

  const UserLoggedIn = () => {
    if(token) {
    return(
    <span>
    <button onClick={() => setPage('recommended')}>recommended</button>
    <button onClick={() => setPage('add')}>add book</button>
    <button onClick={logout}>logout</button>
      </span>  
  )
    } else {
      return null
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <UserLoggedIn />
               {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>
      <Notify errorMessage={errorMessage} />
      <RecommendedBooks show={page === 'recommended'} />
      <Authors show={page === 'authors'}/>

      <Books show={page === 'books'}  />

     {!token && <LoginForm show={page === 'login'}           setToken={setToken}
          setError={notify} /> }
      <NewBook show={page === 'add'} setError={notify} />

    </div>
  )
/*   } else {
    return <div>loading</div>
  } */
}
const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

export default App
