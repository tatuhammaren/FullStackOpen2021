const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)



beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('test for blog_api', () => {
  test('blogposts are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs are identified by id', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[0].id).toBeDefined()

  })
  test('blogs can be added', async () => {
    const testBlog = {
      title: "Testing Blog",
      author: "A B",
      ulr: 'www.example.com',
      likes: 25
    }
    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogCount = await helper.blogsInDb()
    expect(blogCount).toHaveLength(helper.initialBlogs.length + 1)
  })
})



afterAll(() => {
  mongoose.connection.close()
})