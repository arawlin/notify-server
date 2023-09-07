const schedule = require('node-schedule')

const lib = require('../libs')

describe('node-schedule', () => {
  it('two symbol in one field', async () => {
    schedule.scheduleJob('0-15,20-30 * * * * *', (d) => {
      console.log(d.getSeconds())
    })

    await lib.sleep(60000)
  })
})
