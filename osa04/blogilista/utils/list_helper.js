const _ = require('lodash')


const dummy = () => {
  return 1
}



const totalLikes = blogs => {
  if (blogs.length === 0) return 0
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return {}
  } 
  let mostLikes = blogs.reduce((x, curr) => curr.likes > x.likes ? curr : x)
  return mostLikes
}

const mostBlogs = blogs => {

  let group = _.countBy(blogs, 'author')
  let pairs = _.toPairs(group)
  let maxBlogs = _.maxBy(pairs, _.tail)
  //console.log(group)
  //console.log(pairs)
  return { 'author': maxBlogs[0], 'blogs': maxBlogs[1] }
}

const mostLikes = blogs => {
  const author = (blog) => {
    return blog.author
  }
  if (blogs.length === 0) return {}

  const blog = _.groupBy(blogs, author)
  const likes = _.mapValues(blog, totalLikes)
  const authorWithMostLikes = Object.entries(likes).reduce((a,b) => a[1] > b[1] ? a : b)
  return { 'author':authorWithMostLikes[0],'likes':authorWithMostLikes[1] }
}
module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}