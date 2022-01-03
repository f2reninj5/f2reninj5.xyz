
const { sql } = require('../tokens.json')
const mysql = require('mysql2')
const pool = mysql.createPool({
    
    host: sql.host,
    user: sql.user,
    password: sql.password,
    database: sql.database,
    charset : 'utf8mb4'
})

module.exports = {

    queryPool(query) {

        let result = new Promise((resolve, reject) => {
    
            pool.query(query, (err, rows) => {
        
                if (err) {
        
                    return reject(err)
                }
        
                return resolve(rows)
            })
        })

        return result
    }
}