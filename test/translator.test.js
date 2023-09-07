const translator = require('../libs/translator')

describe('translator', () => {
  it.skip('list lang', async () => {
    await translator.listLanguages()
  })

  it('en to zh', async () => {
    const text = 'The text to translate, e.g. Hello, world!'
    const target = 'zh'

    const translation = await translator.trans(text, target)
    console.log(`${text} -> ${translation}`)
  })
})
