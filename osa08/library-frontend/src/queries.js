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
export const GET_ALL_BOOKS = gql`
query{
    allBooks{
        title,
        author,
        published
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
        author, 
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