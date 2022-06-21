const emailSend = require('../libs/emailSend')

describe('email send', () => {
  it('send one', async () => {
    const res = await emailSend.send('test1', 'hahaha')
    console.log(res)
  })
})
