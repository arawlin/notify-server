const { Translate } = require('@google-cloud/translate').v2

const TARGET = 'zh'

const translate = new Translate()

const listLanguages = async () => {
  const [languages] = await translate.getLanguages()
  console.log('Languages:')
  languages.forEach(console.log)
}

const trans = async (text, target) => {
  const [translation] = await translate.translate(text, target)
  return translation
}

module.exports = {
  listLanguages,
  trans,
  TARGET,
}
