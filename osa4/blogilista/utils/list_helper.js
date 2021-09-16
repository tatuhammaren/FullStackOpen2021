const _ = require("lodash")


const dummy = (blogs) => {
  return 1;
}



const totalLikes = blogs => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return {}
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

}
module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}