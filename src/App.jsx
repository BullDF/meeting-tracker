import { useState } from 'react'
import { makeAPICall } from './utils'
import './App.css'

function App() {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useState([])

    return (
        <div className="app-container">
            <h1>Meeting Tracker</h1>

            <div className="chat-area">
                {history.length === 0 ? (
                    <p className="placeholder-text">What do you want to summarize today?</p>
                ) : (history.map(([align, content], i) => (
                    <div key={i} className={`bubble-wrapper ${align === 'right' ? 'bubble-wrapper-right' : 'bubble-wrapper-left'}`}>
                        <div className={align === 'right' ? 'bubble-right' : 'bubble-left'}>
                            {content}
                        </div>
                    </div>
                )))}
            </div>

            <div className="input-row">
                <textarea
                    placeholder='Enter meeting notes here...'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={3}
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
            </div>
        </div>
    )
}

export default App
