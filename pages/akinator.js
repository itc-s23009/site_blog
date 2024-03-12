import { useEffect, useState } from 'react'

const AkinatorPage = () => {
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAkinatorData = async () => {
      const region = 'en'
      const childMode = false
      const proxy = undefined

      const aki = new Aki({ region, childMode, proxy })
      await aki.start()
      setQuestion(aki.question)
      setAnswers(aki.answers)
      setIsLoading(false)
    }

    fetchAkinatorData()
  }, [])

  const handleAnswer = async answer => {
    setIsLoading(true)
    const aki = new Aki()
    await aki.step(answer)
    setQuestion(aki.question)
    setAnswers(aki.answers)
    setIsLoading(false)
  }

  return (
    <div>
      <h1>Akinator API</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Question: {question}</p>
          <p>Answers:</p>
          <ul>
            {answers.map((answer, index) => (
              <li key={index}>
                <button onClick={() => handleAnswer(answer)}>{answer}</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default AkinatorPage
