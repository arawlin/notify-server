const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler')
const emailProcess = require('../libs/emailProcess')

emailProcess.init()

const task = new AsyncTask('email queue task', async () => {
  await emailProcess.doOnQueue()
})

module.exports = new SimpleIntervalJob({ seconds: emailProcess.QUEUE_WAIT_TIME }, task)
