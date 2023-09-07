// const { ToadScheduler } = require('toad-scheduler')
// const taskToadEmail = require('./taskToadEmail')

const schedule = require('node-schedule')
const taskScheduleEmail = require('./taskScheduleEmail')
const taskScheduleTime = require('./taskScheduleTime')

const timezone = 'Etc/UTC'

const init = () => {
  // const toadScheduler = new ToadScheduler()
  // toadScheduler.addSimpleIntervalJob(taskToadEmail)

  schedule.scheduleJob({ rule: taskScheduleEmail.cron, tz: timezone }, taskScheduleEmail.task)
  schedule.scheduleJob({ rule: taskScheduleTime.cron, tz: timezone }, taskScheduleTime.task)
}

module.exports = {
  init,
}
