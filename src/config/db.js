const env = process.env.NODE_ENV // environment param

let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
  }
}

if (env === 'production') {}

module.exports = {
  MYSQL_CONF
}