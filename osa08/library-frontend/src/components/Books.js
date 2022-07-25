import {useQuery,  useLazyQuery, } from '@apollo/client'
import { useEffect, useMemo, useState, } from 'react'
import { GET_BOOKS } from '../queries'
const Books = ({show}) => {
  const [getBooks, result] = useLazyQuery(GET_BOOKS, {
    fetchPolicy: "network-only",
  });
  const {loading, data}= useQuery(GET_BOOKS)  
  const books = result?.data?.allBooks
  ? result?.data?.allBooks
  : data?.allBooks;


  useEffect(() => {
    getBooks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const genres = useMemo(() => [...new Set(data?.allBooks.flatMap((b) => b.genres))], [data?.allBooks])


  if (!show) {
    return null
  }
  if (loading) return null
    return (
      <div>
        <h2>books</h2>
  
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          
          {genres.map((genre) => {
            return (
              <button onClick={() => getBooks({variables: {genre: genre}})}
               key={genre}>{genre}</button>
            )
          })}
          <button onClick={() => getBooks()} key={'all'}>show all</button>
        </div>
      </div>
    )
}

export default Books
