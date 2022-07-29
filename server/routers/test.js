const express = require("express")
const router = express.Router()
const { query, genid } = require("../db/DbUtils")

router.get("/test", async (req, res) => {
  let { err, results } = await query("select * from admin")
  res.send({
    id: genid.NextId(),
    results
  })
})

module.exports = router