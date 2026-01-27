import { useState } from 'react'
import { makeAPICall } from './utils'
import './App.css'

function App() {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useState([])

    return (
        <>
            <h1>Meeting Tracker</h1>

            {history.length === 0 ? (
                <p>What do you want to summarize today?</p>
            ) : (history.map(([align, content], i) => (
                <p key={i} align={align}>{content}</p>
            )))}

            <textarea
                placeholder='Enter meeting notes here...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button
                onClick={async () => {
                    setInput('')
                    setHistory([...history, ['right', input]])
                    setLoading(true)
                    const response = await makeAPICall(input)
                    setHistory([...history, ['right', input], ['left', response.text]])

                    setLoading(false)
                }}
                disabled={loading}
            >
                Submit
            </button>
        </>
    )
}

export default App
