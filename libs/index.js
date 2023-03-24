const sleep = async (interval) => {
  return new Promise((resolve) => setTimeout(resolve, interval))
}

const isEmptyObject = (obj) => {
  return !obj || Object.keys(obj).length === 0
}

module.exports = {
  sleep,
  isEmptyObject,
}
