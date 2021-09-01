const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./contollers/blogs')
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')


logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => logger.info(`connected to db `))
  .catch((error) => logger.error(`error while connecting to db: `, error.message))

app.use(cors())

app.use(express.json())


app.use('/api/blogs', blogsRouter)

module.exports = app