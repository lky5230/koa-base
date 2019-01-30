const mysql = require('mysql')
let pools = {}
let query = (sql,callback, host = '127.0.0.1') => {
    if (!pools.hasOwnProperty(host)) {
        pools[host] = mysql.createPool({
            host: host,
            port: '3306',
            user: 'root',
            password: ''

        })
    }
    pools[host].getConnection((err, connection) => {
        connection.query(sql, (err, results) => {
            callback(err, results)
            connection.release()
        })
    })
}

module.exports = query