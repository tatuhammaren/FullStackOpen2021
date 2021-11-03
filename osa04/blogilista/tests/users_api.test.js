const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')
const api = supertest(app)
beforeEach(async () => {
  
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await User.deleteMany({})
  await user.save()
})
afterAll(async ()=> {
  mongoose.connection.close()
})


describe('user is succesfully created ', () => {
  
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'tats',
      name: 'tatu mm',
      password: 'moi123',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
} )

describe('username / password fails', () => {


  test('user creation with non-valid password fails', async () => {
    const newUser = 
      {
        username: 'tatsu',
        name: 'tatsu',
        password: 'm'
      }
    
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('username is unique ',  async () => {
    const newUser =
    {
      username: 'root',
      name: 'root',
      password: 'mooooi',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })
})
