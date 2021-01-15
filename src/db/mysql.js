const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')

const connection = mysql.createConnection(MYSQL_CONF)

connection.connect()

function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        console.error(err)
        return
      }
      resolve(result)
    })
  })
  return promise
}

module.exports = {
  exec
}