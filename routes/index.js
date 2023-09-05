const express = require('express')
const router = express.Router()
const result = require('../libs/result')
const emailProcess = require('../libs/emailProcess')

router.get('/', function (req, res, next) {
  try {
    const data = req.query?.data
    if (!data) {
      res.json(result(1, 'param data empty'))
      return
    }

    let datao
    try {
      datao = JSON.parse(data)
    } catch (e) {
      datao = data
    }

    const subject = datao?.subject || 'notice'
    const text = datao?.text || datao

    // maybe nullish
    const emails = req.query?.emails
    const silent = req.query?.silent

    emailProcess.sendInQueue(subject, text, emails, silent)

    res.json(result(0))
  } catch (e) {
    console.error(e)
    res.json(result(2, 'system error, retry'))
  }
})

module.exports = router
