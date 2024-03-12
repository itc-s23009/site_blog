const { Aki } = require('aki-api')

const run = async () => {
  const region = 'en'
  const childMode = false
  const proxy = undefined

  const aki = new Aki({ region, childMode, proxy })
  await aki.start()
  console.log('question:', aki.question)
  console.log('answers: ', aki.answers)
}

run().catch(console.error)
