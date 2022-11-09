const emailSend = require('../libs/emailSend')

describe('email send', () => {
  it('send one', async () => {
    const res = await emailSend.send('test1', 'hahaha11')
    // const res = await emailSend.send('test1', 'hahaha', 'xxx@xxx.com,yyy@yyy.com')
    console.log(res)
  })
})
