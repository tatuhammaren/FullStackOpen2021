const { ApolloServer, gql, UserInputError} = require('apollo-server')
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const { v4: uuid } = require('uuid')
const {MONGODB_URI} = require('./config')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('./config')
const User = require('./models/user')

console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }

  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})