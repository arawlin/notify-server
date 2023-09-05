// const { ToadScheduler } = require('toad-scheduler')
// const taskToadEmail = require('./taskToadEmail')

const schedule = require('node-schedule')
const taskScheduleEmail = require('./taskScheduleEmail')

const init = () => {
  // const toadScheduler = new ToadScheduler()
  // toadScheduler.addSimpleIntervalJob(taskToadEmail)

  schedule.scheduleJob(taskScheduleEmail.cron, taskScheduleEmail.task)
}

module.exports = {
  init,
}
