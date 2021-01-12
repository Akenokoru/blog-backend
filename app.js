const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// handle post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if(!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise
}

const serverHandler = (req, res) => {
  res.setHeader('Content-type', 'application/json')

  // get path
  const url = req.url
  req.path = url.split('?')[0]

  // get query
  req.query = querystring.parse(url.split('?')[1])

  // handle post data
  getPostData(req).then(postData => {
    req.body = postData
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
  })
}

module.exports = serverHandler