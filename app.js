const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])
  
  // set response header
  res.setHeader('Content-type', 'application/json')

  // set response data
  const resData = {
    method,
    url,
    path,
    query
  }
  
  // GET method handler
  if (method === 'GET') {
    res.end(
      JSON.stringify(resData)
    )
  }

  // POST method handler
  if (method === 'POST') {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resData.postData = postData
      res.end(
        JSON.stringify(resData)
      )
    })
  }
})

server.listen(3000);
console.log('Listening on port 3000');