const emailSend = require('../libs/emailSend')

describe('email send', () => {
  it('send one', async () => {
    let res = await emailSend.send('test1', 'aaa')
    console.log(res)

    res = await emailSend.send('test1', 'bbb')
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
})
