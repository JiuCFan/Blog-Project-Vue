const express = require("express")
const router = express.Router()
const { generateToken } = require("../utils/JWT")
const { query, genid } = require("../db/DbUtils")

router.post("/login", async (req, res) => {
  let { account, password } = req.body
  let { err, results } = await query("select * from admin where account=? and password=?", [account, password])
  if (err == null && results.length > 0) {
    const login_token = generateToken({ account })

    let update_token_sql = "update admin set token=? where id=?"

    await query(update_token_sql, [login_token, results[0].id])
    let admin_info = results[0]
    admin_info.token = login_token
    admin_info.password = ""
    res.send({
      code: 200,
      msg: "登录成功",
      data: admin_info
    })
  } else {
    res.send({ code: 500, msg: "登录失败,账号或密码错误", err })
  }
})

module.exports = router