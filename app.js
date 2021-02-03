const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// global session data
const SESSION_DATA = {}

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  console.log('d.toGMTString() is', d.toGMTString())
  return d.toGMTString()
}

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

  // get cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const value = arr[1]
    req.cookie[key] = value
  })
  console.log('req.cookie.is', req.cookie)

  // handle session
  let needSetCookie = false
  let userId = req.cookie.userid
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]
  console.log('req.session', req.session)

  // handle post data
  getPostData(req).then(postData => {
    req.body = postData
    // blog router handler
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires= ${getCookieExpires()}`)
        }
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }

    // user router handler
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires= ${getCookieExpires()}`)
        }
        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }

    // return 404
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 not found")
    res.end()
  })
}

module.exports = serverHandler