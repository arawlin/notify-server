// const { ToadScheduler } = require('toad-scheduler')
// const taskToadEmail = require('./taskToadEmail')

const schedule = require('node-schedule')
const taskScheduleEmail = require('./taskScheduleEmail')
const taskScheduleTime = require('./taskScheduleTime')

const init = () => {
  // const toadScheduler = new ToadScheduler()
  // toadScheduler.addSimpleIntervalJob(taskToadEmail)

  schedule.scheduleJob(taskScheduleEmail.cron, taskScheduleEmail.task)
  schedule.scheduleJob(taskScheduleTime.cron, taskScheduleTime.task)
}

module.exports = {
  init,
}
