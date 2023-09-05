const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler')

const emailProcess = require('../libs/emailProcess')
emailProcess.init()

const interval = {
  seconds: 10,
  runImmediately: true,
}
const options = {
  id: 'task toad email process',
  preventOverrun: true,
}

const task = new AsyncTask('email queue task', async () => {
  await emailProcess.doOnQueue()
})

module.exports = new SimpleIntervalJob(interval, task, options)
