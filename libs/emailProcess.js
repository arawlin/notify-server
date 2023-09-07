const nodemailer = require('nodemailer')
const { sleep } = require('./index')
const { md5 } = require('./crypto')
const translator = require('../libs/translator')

// { subject, text, to, silent, extend }
const queue = []
const QUEUE_WAIT_TIME = 10

// {hash: time}
const mapSilent = new Map()
const SILENT_TIME = 4 * 3600 * 1000

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

  if (!to || to.indexOf('@') < 0) {
    to = process.env.EMAIL_TO
  }
  const mo = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html: `<p>${text}<p>`,
  }

  try {
    const info = await transporter.sendMail(mo)
    console.log('email:', info.messageId, new Date(), mo)
  } catch (e) {
    console.error(`${new Date()} - ${mo}`, e)
  }
}

/**
 * @param {*} subject
 * @param {*} text
 * @param {*} to
 * @param {*} silent {hash, deadline}
 * @param {*} extend {translate}
 */
const sendInQueue = (subject, text, to, silent, extend) => {
  queue.push({ subject, text, to, silent, extend })
}

const doOnQueue = async () => {
  // {"to": {"subject": ["text0", "text1"]}}
  const cts = {}
  while (true) {
    const ct = queue.shift()
    if (!ct) {
      break
    }

    // filter silent
    const hash = ct.silent?.hash ?? md5(ct.text)
    const timeSilent = mapSilent.get(hash)
    const timeCurr = new Date().getTime()
    if (timeSilent && timeSilent > timeCurr) {
      // consume it
      console.log(`msg has been consumed - ${ct.text.substring(0, Math.min(10, ct.text.length))}`)
      continue
    }
    mapSilent.set(hash, timeCurr + (ct.silent?.deadline ?? SILENT_TIME))

    let subs = cts[ct.to]
    if (!subs) {
      cts[ct.to] = {}
      subs = cts[ct.to]
    }

    let txs = subs[ct.subject]
    if (!txs) {
      subs[ct.subject] = []
      txs = subs[ct.subject]
    }

    // translate
    let text = ct.text
    if (ct.extend?.translate) {
      const translation = translator.trans(text, translator.TARGET)
      text = `<p>${translation}</p><p>${text}</p>`
    }

    txs.push(text)
  }
  // console.log(cts)

  for (const to in cts) {
    const subs = cts[to]
    for (const s in subs) {
      const sextend = subs[s].length > 1 ? ' merged' : ''
      const txs = subs[s].reduce((pre, cur) => pre + `<p>${cur}</p>`, '')
      await send(s + sextend, txs, to)
      await sleep(1 * 1000)
    }
  }

  // clean silent stale
  const timeCurr = new Date().getTime()
  for (const [k, v] of mapSilent) {
    if (v < timeCurr) {
      mapSilent.delete(k)
    }
  }
}

const runQueue = async () => {
  while (true) {
    await sleep(QUEUE_WAIT_TIME * 1000)
    // console.log('queue: ', queue.length)

    await doOnQueue()
  }
}

module.exports = {
  init,
  send,
  sendInQueue,
  doOnQueue,
  runQueue,

  queue,
  mapSilent,
}
