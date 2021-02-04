const redis = require('redis')

// Init redis client
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
  console.log(err)
})

// Test
redisClient.set('myname', 'zhangsan2', redis.print)
redisClient.get('myname', (err, val) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('val: ', val)
  redisClient.quit()
})