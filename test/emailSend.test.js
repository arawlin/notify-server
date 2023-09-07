const emailSend = require('../libs/emailSend')

describe('email send', () => {
  it.skip('send one', async () => {
    let res = await emailSend.send('test1', 'aaa', null, { hash: '11111', deadline: 60000 })
    console.log(res)

    res = await emailSend.send('test1', 'bbb', null, { hash: '11111', deadline: 60000 })
    console.log(res)

    const html = `
    <table>
      <thead>
        <tr>
          <th colspan="2">The table header</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="color: red;">The table body</td>
          <td>with two columns</td>
        </tr>
      </tbody>
    </table>
    `
    res = await emailSend.send('test1', html)
    console.log(res)

    // res = await emailSend.send('test1', 'hahaha', 'xxx@xxx.com,yyy@yyy.com')
    // console.log(res)
  })

  it('send two', async () => {
    let res
    res = await emailSend.send('test2', 'Hello World, This is a test text!', null, null, { translate: true })
    console.log(res)
  })
})
