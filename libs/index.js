const sleep = async (interval) => {
  return new Promise((resolve) => setTimeout(resolve, interval))
}

const isEmptyObject = (obj) => {
  return !obj || Object.keys(obj).length === 0
}

const timeNow = () => {
  return new Date().toISOString()
}

const timeThen = (timestamp) => {
  return new Date(timestamp).toISOString()
}

module.exports = {
  sleep,
  isEmptyObject,
  timeNow,
  timeThen,
}
