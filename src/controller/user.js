const { exec } = require('../db/mysql')

const loginCheck = (username, password) => {
  // if (username = 'andrew' && password === 123) {
  //   return true
  // }
  // return false
  const sql = `
    select username, realname from users where username='${username}' and password='${password}';
  `
  return exec(sql).then(rows => {
    console.log(rows, 'sss', typeof rows)
    return rows[0] || {}
  })
}

module.exports = {
  loginCheck
}