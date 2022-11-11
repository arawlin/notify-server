const nodemailer = require('nodemailer')
const { sleep } = require('./index')

const queue = []
const QUEUE_WAIT_TIME = 5

let transporter

const init = () => {
  if (!process.env.EMAIL_HOST) {
    throw new Error('email not config')
  }

  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    debug: false,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASS,
    },
  })

  console.log('email init success', process.env)
}

const send = async (subject, text, to) => {
  if (!subject || !text) {
    console.log('subject or text is empty')
    return
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      to: to ?? process.env.EMAIL_TO,
      subject,
      text,
    })

    console.log('email:', info.messageId, new Date(), subject, text)
  } catch (e) {
    console.error(`${new Date()} - ${subject} - ${text}`, e)
  }
}

const sendInQueue = (subject, text, to) => {
  queue.push({ subject, text, to })
}

const doOnQueue = async () => {
  const ct = queue.shift()
  if (!ct) {
    return
  }
  await send(ct.subject, ct.text, ct.to)
}

const runQueue = async () => {
  while (true) {
    await sleep(QUEUE_WAIT_TIME * 1000)
    // console.log('queue: ', queue.length)

    await doOnQueue()
  }
}

module.exports = {
  QUEUE_WAIT_TIME,
  init,
  send,
  sendInQueue,
  doOnQueue,
  runQueue,
}
