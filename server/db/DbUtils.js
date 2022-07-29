//  导入 mysql 模块
const mysql = require("mysql")
const GenId = require("../utils/SnowFlake")

// 建立与 MySQL 数据库的连接关系
const pool = mysql.createPool({
  connectionLimit: 10, // 连接池
  host: '127.0.0.1', // 数据库的 IP 地址
  user: 'root', // 登录数据库的账号
  password: 'admin123', // 登录数据库的密码
  database: 'blog_vue', // 指定要操作哪个数据库
})
let query = (sql, values = [], callback) => {
  if (!sql) return
  return new Promise((resolve, reject) => {
    // 建立连接
    pool.getConnection((err, connection) => {
      if (err) return resolve(err)
      connection.query(sql, values, (err, results, fields) => {
        /* if (error) {
          reject({ code: 500, error })
        } else {
          resolve(results)
        } */
        resolve({ err, results })
        // 将连接返回到连接池中, 准备让其他人重复使用
        connection.release()
        callback && callback(results, fields)
      })
    })
  })
}

const genid = new GenId({ WorkerId: 1 })

module.exports = { query, genid }