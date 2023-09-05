const emailProcess = require('../libs/emailProcess')
emailProcess.init()

const cron = `*/10 * 7-23 * * *`

const task = async () => {
  await emailProcess.doOnQueue()
}

module.exports = {
  cron,
  task,
}
