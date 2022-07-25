import { gql} from '@apollo/client'

export const GET_ALL_AUTHORS = gql`
query {
  allAuthors{
    name,
    born,
    bookCount
  }
}
`
export const GET_BOOKS = gql`
query getBooks($genre: String){
   allBooks(genre: $genre){
    title,
    genres,
    published
    author {
      name
    }
  }
}`

export const ADD_BOOK = gql`
mutation createBook(
    $title: String!, 
    $author: String!, 
    $published: Int!, 
    $genres: [String]!){
    addBook(
    title: $title, 
    author: $author, 
    published: $published, 
    genres: $genres)
    {
        title, 
        author{
          name
        }, 
        published, 
        genres, 
        id
    }
}
`

export const UPDATE_BIRTHYEAR = gql`
mutation updateBirthYear($name: String!, $setBornTo: Int!){
    editAuthor(name: $name, setBornTo: $setBornTo) {
        name, born
    }
}`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const MEITSI = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
