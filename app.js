const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandler = (req, res) => {
  res.setHeader('Content-type', 'application/json')

  // blog router handler
  const blogData = handleBlogRouter(req, res)
  if (blogData) {
    res.end(
      JSON.stringify(blogData)
    )
    return
  }

  // user router handler
  const userData = handleUserRouter(req, res)
  if (userData) {
    res.end(
      JSON.stringify(userData)
    )
    return
  }

  // return 404
  res.writeHead(404, {"Content-type": "text/plain"})
  res.write("404 not found")
  res.end()
}

module.exports = serverHandler