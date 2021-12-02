import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  //console.log('uusi token', newToken)
  token = `bearer ${newToken}`
  //console.log('asetettu token', token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  console.log(response)
  console.log(response.data)
  return response.data

}

const remove = async blogId => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`,config)
  return response.data
}

const update = async (blogId, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog, config)
  return response.data
}
const exp =  { getAll, create, setToken, update, remove }

export default exp