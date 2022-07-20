import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {useQuery} from '@apollo/client'
import { GET_ALL_AUTHORS, GET_ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(GET_ALL_AUTHORS)
  const books = useQuery(GET_ALL_BOOKS)

  
  if(!authors.loading && !books.loading) {
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={authors.data.allAuthors} />

      <Books show={page === 'books'} books={books.data.allBooks} />

      <NewBook show={page === 'add'} />
    </div>
  )
  } else {
    return <div>loading</div>
  }
}

export default App
