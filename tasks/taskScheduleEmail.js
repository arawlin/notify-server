const emailProcess = require('../libs/emailProcess')
emailProcess.init()

// UTC time, 0-7 -> 16-23, is no disturb
const cron = `*/10 * 0-15,23 * * *`

const task = async () => {
  await emailProcess.doOnQueue()
}

module.exports = {
  cron,
  task,
}
