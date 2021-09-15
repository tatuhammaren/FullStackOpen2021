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
module.exports = {
  dummy, totalLikes, favoriteBlog
}