import { Aki } from 'aki-api'

const handler = async (req, res) => {
  const region = 'en'
  const childMode = false
  const proxy = undefined

  const aki = new Aki({ region, childMode, proxy })
  await aki.start()

  res.status(200).json({
    question: aki.question,
    answers: aki.answers
  })
}
export default handler
