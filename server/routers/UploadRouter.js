const express = require("express")
const router = express.Router()
const fs = require("fs")
const path = require("path")
const { query, genid } = require("../db/DbUtils")

router.post("/rich_editor_upload", async (req, res) => {
  if (!req.files) {
    res.send({
      "errno": 1, //只要不为0
      "message": "上传失败"
    })
    return
  }

  let files = req.files
  let ret_files = []

  for (let file of files) {
    // 获取文件名字后缀
    let file_ext = file.originalname.substring(file.originalname.lastIndexOf(".") + 1)
    // 随机文件名字
    let file_name = genid.NextId() + "." + file_ext
    // 修改名字和移动文件
    fs.renameSync(
      path.join(process.cwd(), "/public/upload/temp/", file.filename),
      path.join(process.cwd(), "/public/upload/", file_name)
    )
    ret_files.push("upload/" + file_name)
    res.send({
      "errno": 0,
      "data": {
        "url": ret_files[0]
      }
    })
  }
})

module.exports = router