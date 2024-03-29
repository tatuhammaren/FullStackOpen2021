const {gql} = require('apollo-server')

module.exports = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]
    me: User
  }
  type Book {
    title: String!
    published: Int!
    id: ID!
    author: Author! 
    genres: [String]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}
  type Mutation {
    addBook(
      title: String!
    published: Int!
    author: String!
    genres: [String]!
    ): Book,
    editAuthor(
      name: String!,
      setBornTo: Int! 
    ): Author
    createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
  }
`
