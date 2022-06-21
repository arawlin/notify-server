const { ToadScheduler } = require('toad-scheduler')
const taskEmail = require('./taskEmail')

const init = () => {
  const scheduler = new ToadScheduler()

  scheduler.addSimpleIntervalJob(taskEmail)
}

module.exports = {
  init,
}
