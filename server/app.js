/** 
 "multer" 处理上传功能的中间件
 "cors" 处理跨域
 "mysql" 数据库
 "uuid" 唯一id中间件
*/

const express = require("express")
const cors = require("cors")
// const { expressjwt: jwt } = require("express-jwt")
const multer = require("multer")
const path = require("path")
const app = express()
const port = 8080

const auth = require("./utils/JWT")
const admin = require("./routers/AdminRouter")
const category = require("./routers/CategoryRouter")
const blog = require("./routers/BlogRouter")
const upload = require("./routers/UploadRouter")

//开放跨域
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// 指定上传临时目录
const update = multer({
  dest: "./public/upload/temp"
})
app.use(update.any())
// 指定静态资源路径
app.use(express.static(path.join(__dirname, "public")))

app.use("/", require("./routers/test"))
app.use("/admin", admin)
app.use("/category", auth.verifyToken, category)
app.use("/blog", auth.verifyToken, blog)
app.use("/upload", upload)


app.listen(port, () => {
  console.log(`启动成功：运行在http://localhost:${port}/`)
})