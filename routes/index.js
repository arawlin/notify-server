const express = require('express')
const router = express.Router()
const result = require('../libs/result')

router.get('/', function (req, res, next) {
  try {
    res.json(result(0, 'haha', { aaa: 222 }))
  } catch (e) {
    console.error(e)
    res.json(result(2, 'system error, retry'))
  }
})

module.exports = router
