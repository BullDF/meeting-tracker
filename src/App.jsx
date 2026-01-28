import { useState, useRef, useEffect } from 'react'
import { makeAPICall, testResponse } from './utils'
import './App.css'

function App() {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useState([])
    const chatEndRef = useRef(null)

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [history])

    const submitRequest = async () => {
        setInput('')
        setHistory([...history, ['right', input]])
        setLoading(true)
        try {
            // const response = await makeAPICall(input)
            const response = testResponse()
            let json
            try {
                json = JSON.parse(response.text)
                for (const task of json.tasks) {
                    task.completed = false
                }
                setHistory([...history, ['right', input], ['left', json]])
            } catch (_) {
                setHistory([...history, ['right', input], ['left', 'JSON Error']])
            }
        } catch (_) {
            setHistory([...history, ['right', input], ['left', 'API Error']])
        }

        setLoading(false)
    }

    const formatResponse = (text) => {
        if (text === 'API Error') {
            return (<div>Server is unavailable. Please try again later.</div>)
        } else if (text === 'JSON Error')
            return (<div>Invalid response format. Please try again.</div>)

        const json = text

        return (
            <div>
                <div>{json.message}</div>

                {json.tasks.length === 0 ? null : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Task</th>
                                <th>Owner</th>
                                <th>Due Date</th>
                                <th>Completed</th>
                            </tr>
                        </thead>

                        <tbody>
                            {json.tasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.completed ? <s>{task.task}</s> : <div>{task.task}</div>}</td>
                                    <td>{task.completed ? <s>{task.owner}</s> : <div>{task.owner}</div>}</td>
                                    <td>{task.completed ? <s>{task.due_date}</s> : <div>{task.due_date}</div>}</td>
                                    <td>
                                        <input
                                            type='checkbox'
                                            checked={task.completed}
                                            onChange={() => {
                                                task.completed = !task.completed
                                                setHistory([...history])
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        )
    }

    return (
        <div className="app-container">
            <h1>Meeting Tracker</h1>

            <div className="chat-area">
                {history.length === 0 ? (
                    <p className="placeholder-text">What do you want to summarize today?</p>
                ) : (history.map(([align, text], i) => (
                    <div key={i} className={`bubble-wrapper ${align === 'right' ? 'bubble-wrapper-right' : 'bubble-wrapper-left'}`}>
                        <div className={align === 'right' ? 'bubble-right' : 'bubble-left'}>
                            {align === 'left' ? (formatResponse(text)) : (<div>{text}</div>)}
                        </div>
                    </div>
                )))}
                <div ref={chatEndRef} />
            </div>

            <div className="input-row">
                <textarea
                    placeholder='Enter meeting notes here...'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={3}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            submitRequest()
                        }
                    }}
                />

                <button
                    onClick={submitRequest}
                    disabled={loading}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default App
