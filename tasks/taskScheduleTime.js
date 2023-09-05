const { timeNow } = require('../libs')
const emailProcess = require('../libs/emailProcess')

const cron = `0 45 7,11,15,19,23 * * *`

const task = () => {
  emailProcess.sendInQueue('time', timeNow())
}

module.exports = {
  cron,
  task,
}
