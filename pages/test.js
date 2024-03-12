import { useState, useEffect } from 'react'

const AkinatorPage = () => {
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    const fetchAkinatorData = async () => {
      const response = await fetch('/api/akinator/start') // サーバーサイドでAkinatorセッションを開始するAPIを呼び出す
      const data = await response.json()
      setQuestion(data.question)
      setAnswers(data.answers)
      setIsLoading(false)
      setSession(data.session) // Akinatorセッションを状態に設定
    }

    fetchAkinatorData()
  }, [])

  const handleAnswer = async answer => {
    setIsLoading(true)
    const response = await fetch('/api/akinator/answer', {
      // サーバーサイドで回答を送信して次の質問を取得するAPIを呼び出す
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answer, session }) // ユーザーの回答とセッションをリクエストボディに含める
    })
    const data = await response.json()
    setQuestion(data.question)
    setAnswers(data.answers)
    setIsLoading(false)
  }
  return (
    <div>
      <h1>Akinator API</h1>
      {!isLoading && answers.length > 0 && (
        <ul>
          {answers.map((answer, index) => (
            <li key={index}>
              <button onClick={() => handleAnswer(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AkinatorPage
