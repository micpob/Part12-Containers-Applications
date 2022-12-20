const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((total, blog) => { return total + blog.likes }, 0)
}

const favoriteBlog = blogs => {
  let result = blogs.reduce((currentHighest, blog) => {
    return currentHighest.likes >= blog.likes ? currentHighest : blog
  }, 0)

  if (result === 0 || result.likes === 0) {
    return 'none'
  } else {
    return result = {
      title: result.title,
      author: result.author,
      likes: result.likes
    }
  }
}

const mostBlogs = blogs => {
  if (blogs.length < 1) { return 'none' }

  const authors = _.map(blogs, blog => { return blog.author })

  const result = _(authors)
    .countBy()
    .entries()
    .maxBy(_.last)

  return { author: result[0], blogs: result[1] }
}

const mostLikes = blogs => {
  if (blogs.length < 1) { return 'none' }

  const JustAuthorsAndLikes = _.map(blogs, blog => { return _.pick(blog, ['author', 'likes']) })

  const groupedAuthors = _.groupBy(JustAuthorsAndLikes, AuthorAndLikesPair => AuthorAndLikesPair.author)

  const toObject = _.map(groupedAuthors, (likes, author) => ({
    author: author,
    likes: likes.reduce((sum, val) => sum + val.likes, 0)
  }))

  const result = _.maxBy(toObject, property => property.likes)

  if (result.likes === 0) {
    return 'none'
  } else {
    return result
  }

}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
