const {gql} = require('apollo-server')

module.exports = {
    Query: {
      authorCount: async () => Author.collection.countDocuments(),
      bookCount: () => Books.collection.countDocuments(),
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
      allAuthors: () => Author.collection.find({})
    },
    Author: {
      bookCount: async (root) => await Book.countDocuments({author: root})
    },
    Mutation: {
      addBook: async (root, args) => {
        let userInDB = await Author.findOne({name: args.author})
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
      editAuthor: async (root, args) => {
        console.log(args);
        const authorInDb = await Author.findOne({name: args.name})
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
      }
    }
  }