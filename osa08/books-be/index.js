const { ApolloServer, gql, UserInputError} = require('apollo-server')
const  {typeDefs} = require('./typeDefs')
const = {resolvers} = require('./resolvers')
const { v4: uuid } = require('uuid')
const {MONGODB_URI} = require('./config')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })




const resolvers 

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})