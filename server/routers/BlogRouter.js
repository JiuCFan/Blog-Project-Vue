const express = require("express")
const router = express.Router()
const { query, genid } = require("../db/DbUtils")
const { verifyToken } = require("../utils/JWT")

// 添加博客
router.post("/add", verifyToken, async (req, res) => {
  let { title, categoryId, content } = req.body
  let id = genid.NextId()
  let create_time = new Date().getTime()

  let add_sql = "insert into blog(id,category_id,title,content,create_time,update_time) values(?,?,?,?,?,?)"
  let param = [id, categoryId, title, content, create_time, create_time]
  let { err, results } = await query(add_sql, param)
  let blogInfo = { id, categoryId, title, content, create_time }
  if (err == null) {
    res.send({
      code: 200,
      msg: "添加成功",
      blogInfo
    })
  } else {
    res.send({
      code: 500,
      msg: "添加失败",
      error: err
    })
  }
})

// 修改博客
router.put("/update", verifyToken, async (req, res) => {
  let { id, title, categoryId, content } = req.body
  let update_time = new Date().getTime()
  let blogInfo = { id, categoryId, title, content, update_time }

  let update_sql = "update blog set title=?, category_id=?, content=?, update_time=? where id=?"
  let param = [title, categoryId, content, update_time, id]
  let { err, results } = await query(update_sql, param)
  if (err == null) {
    res.send({
      code: 200,
      msg: "修改成功",
      blogInfo
    })
  } else {
    res.send({
      code: 500,
      msg: "修改失败",
      error: err
    })
  }
})

// 删除博客
router.delete("/delete", verifyToken, async (req, res) => {
  let id = req.query.id
  const delete_sql = "delete from blog where id=?"
  let { err, results } = await query(delete_sql, [id])

  if (err == null) {
    res.send({
      code: 200,
      msg: "删除成功"
    })
  } else {
    res.send({
      code: 500,
      msg: "删除失败",
      error: err
    })
  }
})

// 查询博客
router.get("/search", async (req, res) => {
  /**
   * keyword 关键字
   * categoryId 分类id
   * 
   * 分页：
   * page 页码
   * pagesize 分页大小
   */
  let { keyword, categoryId, page, pagesize } = req.query
  page = page == null ? 1 : page
  pagesize = pagesize == null ? 10 : Number(pagesize)
  categoryId = categoryId == null ? 0 : categoryId
  keyword = keyword == null ? "" : keyword

  let where_sql = []
  let params = []
  if (categoryId != 0) {
    where_sql.push("category_id=?")
    params.push(categoryId)
  }
  if (keyword != 0) {
    where_sql.push("(title like ? or content like ?)")
    params.push("%" + keyword + "%")
    params.push("%" + keyword + "%")
  }

  // 存在where条件才拼接
  let where_sqlStr = ""
  if (where_sql.length > 0) {
    where_sqlStr = " where " + where_sql.join("and ")
    // where_sqlStr = where category_id=? and title like ? or category like ?
  }

  // 分页数据sql
  let search_sql = " select * from blog " + where_sqlStr + " order by update_time desc, create_time desc  limit ?,?"
  // limit ?,? 0,10 从第0条开始往后取10条数据
  let search_params = params.concat([(page - 1) * pagesize, pagesize])

  // 查询数据总数sql
  let searchCount_sql = " select count(*) as count from blog " + where_sqlStr
  let searchCount_params = params

  let searchResult = await query(search_sql, search_params)
  let countResult = await query(searchCount_sql, searchCount_params)

  /*   console.log(search_sql)
    console.log(search_params)
    console.log(searchCount_sql)
    console.log(searchCount_params)
    console.log(searchResult)
    console.log(countResult) */

  if (searchResult.err == null && countResult.err == null) {
    res.send({
      code: 200,
      mag: "查询成功",
      data: {
        keyword,
        categoryId,
        page,
        pagesize,
        results: searchResult.results,
        count: countResult.results[0].count,
      }
    })
  } else {
    res.send({
      code: 500,
      msg: "查询失败",
      error: [searchResult.err, countResult.err]
    })
  }
})

// 博客详情
router.get("/detail", async (req, res) => {
  let id = req.query.id
  const detail_sql = "select * from blog where id=?"
  let { err, results } = await query(detail_sql, [id])
  if (err == null) {
    res.send({
      code: 200,
      msg: "获取成功",
      data: results[0]
    })
  } else {
    res.send({
      code: 500,
      msg: "获取失败",
      error: err
    })
  }
})

module.exports = router