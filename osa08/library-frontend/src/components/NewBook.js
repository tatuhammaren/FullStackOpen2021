import { useState } from 'react'
import { ADD_BOOK, GET_ALL_BOOKS } from '../queries'
import { useMutation } from '@apollo/client'
const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])


  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{query: GET_ALL_BOOKS}],
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    
    addBook({variables: {title, author, published: parseInt(published), genres}})
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook