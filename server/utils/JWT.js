const jwt = require("jsonwebtoken")

const secretKey = "vue_blog"

// 生成token
generateToken = function (username) {
  const token =
    "Bearer " +
    jwt.sign(username, secretKey, {
      expiresIn: 60 * 60 * 3, //3h
    })
  return token
}

// 验证token
verifyToken = function (req, res, next) {
  console.log(req.headers.authorization)
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) {
        console.log("verify error", err)
        return res.status(403).json({ code: "403", msg: "token无效" })
      }
      console.log("verify decoded", decoded)
      next()
    })
  } else { return res.status(403).json({ code: "403", msg: "无toekn验证" }) }

}

module.exports = { generateToken, verifyToken }