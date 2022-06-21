const express = require('express')
const router = express.Router()
const result = require('../libs/result')
const emailUtils = require('../libs/emailUtils')

router.get('/', function (req, res, next) {
  try {
    res.json(result(req.query ? 0 : 1))

    const data = req.query?.data
    if (!data) {
      return
    }

    let datao
    try {
      datao = JSON.parse(data)
    } catch (e) {
      datao = data
    }

    const subject = datao.subject ?? 'notice'
    const text = datao.text ?? datao
    emailUtils.sendInQueue(subject, text)
  } catch (e) {
    console.error(e)
    res.json(result(2, 'system error, retry'))
  }
})

module.exports = router
