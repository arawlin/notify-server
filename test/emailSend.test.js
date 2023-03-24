const emailSend = require('../libs/emailSend')

describe('email send', () => {
  it('send one', async () => {
    let res = await emailSend.send('test1', 'aaa')
    console.log(res)

    res = await emailSend.send('test1', 'bbb')
    console.log(res)

    // res = await emailSend.send('test1', 'hahaha', 'xxx@xxx.com,yyy@yyy.com')
    // console.log(res)
  })
})
