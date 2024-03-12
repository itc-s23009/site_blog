import { Aki } from 'aki-api'

export default async function handler (req, res) {
  try {
    const { answer, session } = req.body

    const aki = new Aki({ session })
    await aki.step(answer)

    const question = aki.question
    const answers = aki.answers

    res.status(200).json({ question, answers })
  } catch (error) {
    res.status(500).json({ error: 'Failed to process answer' })
  }
}
