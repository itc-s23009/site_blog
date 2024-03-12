import { useState, useEffect } from 'react'

const AkinatorPage = () => {
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    const fetchAkinatorData = async () => {
      try {
        const response = await fetch('/api/akinator/start')
        const data = await response.json()
        setQuestion(data.question)
        setAnswers(data.answers)
        setIsLoading(false)
        setSession(data.session)
      } catch (error) {
        console.error('Failed to fetch Akinator data:', error)
        setIsLoading(false)
      }
    }

    fetchAkinatorData()
  }, [])

  const handleAnswer = async answer => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/akinator/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer, session })
      })
      const data = await response.json()
      setQuestion(data.question)
      setAnswers(data.answers)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to submit answer:', error)
      setIsLoading(false)
    }
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
