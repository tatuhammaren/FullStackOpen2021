const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

const testUser = {
  'username': 'testaaja',
  'name': 'Testi Testaaja',
  'password': 'testaaja1'
}
const loginUser = {
  'username': 'testaaja',
  'password': 'testaaja1'
}

beforeAll(async () =>{
  await User.deleteMany({})

  await api
    .post('/api/users')
    .send(testUser)
    .set('Accept', 'application/json')
    .expect('Content-Type',/application\/json/)

}) 

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
afterAll(async () => {
  mongoose.connection.close()
})
describe('test for getting a blog', () => {
  test('blogposts are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })}
)

describe('blogs are identified by id', () => {
  test('check if blog is identified by id instead of _id', async () => {
    const blog = await api.get('/api/blogs')
    expect(blog.body[0].id).toBeDefined()
  })
}
)

describe('POST calls to api/blogs', () => {
  test('blogs can be added', async () => {

      

    const loggedUser = await api
      .post('/api/login')
      .send(loginUser)
      .set('Accept','application/json')
      .expect('Content-Type',/application\/json/)
    const newBlog = {
      'title': 'test',
      'author': 'testeri',
      'site:': 'testing.com'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization',`Bearer ${loggedUser.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
  
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
  })
})

  



