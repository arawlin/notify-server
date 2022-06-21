const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler')
const emailUtils = require('../libs/emailUtils')

const task = new AsyncTask('email queue task', async () => {
  await emailUtils.doOnQueue()
})

module.exports = new SimpleIntervalJob({ seconds: 20 }, task)
