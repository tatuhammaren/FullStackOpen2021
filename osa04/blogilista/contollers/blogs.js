const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username: 1, name: 1 } )
  response.json(blogs)
})

blogsRouter.post('/',middleware.userExtractor, async (request, response) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
  
    const blog = new Blog({
      title: body.title,
      author: body.author || '',
      url: body.url,
      likes: body.likes || 0,
      user: request.user._id
    })
  
    const bb = await blog.save()
    request.user.blogs = await request.user.blogs.concat(bb._id)
    await request.user.save()
    response.status(201).json(bb.toJSON())
  
  } catch (e) {
    console.log(e)
  }
  
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === request.user._id.toString())  {
    await blog.remove()
    response.status(204).json()
  }else {
    response.status(401).end()
  }

  
})

blogsRouter.patch('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body
  if(!request.body.likes) {
    console.log('no likes')
  }
  const post = {
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, post, {new: true})
  response.json(updatedBlog)
})

module.exports = blogsRouter