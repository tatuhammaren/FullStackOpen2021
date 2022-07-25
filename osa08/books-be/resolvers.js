const {gql, UserInputError} = require('apollo-server')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('./config')


module.exports = {
    Query: {
      authorCount: async () => Author.collection.countDocuments(),
      bookCount: () => Book.collection.countDocuments(),
      allBooks: async (root, args) => {
  /*       console.log('argumentit', args) */
        if(args.author && args.genre ) {
          const author= await Author.findOne({name: args.author})
          return  await Book.find({$and: [{author: {$in: author}}, {genres: {$in: args.genre}}]}).populate("author")
        }
        if(args.genre) {
          return await Book.find({genres: { $in: args.genre}}).populate("author")
        }
        if(args.author) {
          const author= await Author.findOne({name: args.author})
          return await Book.find({author}).populate("author")
        }
       return await Book.find({}).populate('author')
  /*     console.log(books); */
      },
      allAuthors: async () => await Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      },
    },
    Author: {
      bookCount: async (root) => await Book.countDocuments({author: root})
    },
    Mutation: {
      addBook: async (root, args, {currentUser}) => {

        console.log(args)
        if (!currentUser) {
            throw new UserInputError('Please log in to add a new book.')
        } 
        if(currentUser) console.log(`käyttäjä on ${currentUser}`)
        let userInDB = await Author.findOne({name: args.author})
        if(args.author.lenght < 4) {
          throw new UserInputError('Author min lenght is 4.')
        }
        if(!userInDB){
            userInDB = new Author({
              name: args.author
            })
            try {
              userInDB = await userInDB.save()
            } catch (error) {
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            }
          }
        let book = new Book({title: args.title, author: userInDB, published: args.published, genres: args.genres})
        try {
          book = await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        console.log(book)
        return book
  
      },
      editAuthor: async (root, args, {currentUser}) => {
        if (!currentUser) {
            throw new UserInputError('Please log in to edit an author.')
        }
        console.log(args);
        const authorInDb = await Author.findOne({name: args.name})
        console.log(authorInDb)
        if(!authorInDb) {
          throw new UserInputError('Invalid author! ')
        }
        try {
          authorInDb.born = args.setBornTo
          await authorInDb.save()
  
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
          }
          return authorInDb
      },
      createUser: async (roto, args) => {
        const user = new User({...args})
        try {
            await user.save()
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
              })
        }
        return user
      },
      login: async (root, args) => {
        const user = await User.findOne({username: args.username})     

        if ( !user || args.password !== 'secret' ) {
            throw new UserInputError("wrong credentials")
          }
          const userForToken = {
            username: user.username,
            id: user._id,
          }
      
          return { value: jwt.sign(userForToken, JWT_SECRET) }  
    }
    }
  }