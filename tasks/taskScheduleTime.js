const { timeNow } = require('../libs')
const emailProcess = require('../libs/emailProcess')

// UTC time 23,3,7,11,15 - 7,11,15,19,23
const cron = `0 45 3,7,11,15,23 * * *`

const task = () => {
  emailProcess.sendInQueue('time', timeNow())
}

module.exports = {
  cron,
  task,
}
