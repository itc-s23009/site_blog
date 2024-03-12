import { Aki } from 'aki-api'

export default async function handler (req, res) {
  try {
    const region = 'en'
    const childMode = false
    const proxy = undefined

    const aki = new Aki({ region, childMode, proxy })
    await aki.start()

    const question = aki.question
    const answers = aki.answers
    const session = aki.session

    res.status(200).json({ question, answers, session })
  } catch (error) {
    res.status(500).json({ error: 'Failed to start Akinator session' })
  }
}
