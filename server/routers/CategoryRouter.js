const express = require("express")
const router = express.Router()
const { query, genid } = require("../db/DbUtils")

// 添加接口
router.post("/add", async (req, res) => {
  let { name } = req.body
  const insert_sql = "insert into category(id,name) values(?,?)"
  let { err, results } = await query(insert_sql, [genid.NextId(), name])

  if (err == null) {
    res.send({
      code: 200,
      msg: "添加成功"
    })
  } else {
    res.send({
      code: 500,
      msg: "添加失败"
    })
  }
})

// 修改接口
router.put("/update", async (req, res) => {
  let { id, name } = req.body
  const update_sql = "update category set name=? where id=?"
  let { err, results } = await query(update_sql, [name, id])

  if (err == null) {
    res.send({
      code: 200,
      msg: "修改成功",
    })
  } else {
    res.send({
      code: 500,
      msg: "修改失败"
    })
  }
})

// 删除接口 /category/delete?id=xxx
router.delete("/delete", async (req, res) => {
  let id = req.query.id
  const delete_sql = "delete from category where id=?"
  let { err, results } = await query(delete_sql, [id])

  if (err == null) {
    res.send({
      code: 200,
      msg: "删除成功"
    })
  } else {
    res.send({
      code: 500,
      msg: "删除失败"
    })
  }
})

// 获取列表接口
router.get("/list", async (req, res) => {
  const search_sql = "select * from category"
  let { err, results } = await query(search_sql, [])

  if (err == null) {
    res.send({
      code: 200,
      msg: "查询成功",
      results
    })
  } else {
    res.send({
      code: 500,
      msg: "查询失败"
    })
  }
})
module.exports = router