import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })

export async function makeAPICall(notes) {
    const prompt = `${notes}

From the above meeting notes, extract all tasks, the name of the person assigned to each task, and the due date of each task if present.

The response must be raw JSON with the format below. Do not wrap the JSON in ticks. If no task extracted, change the message accordingly and respond with an empty tasks array.

{
    "message": "Your response to the request (i.e. Here is a breakdown of the meeting notes:)",
    "tasks": [
        {
            "id": "(begin from 1)",
            "task": "...",
            "owner": "...",
            "due_date": "... (if present)"
        },
        ...
    ]
}`
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: prompt
    })

    return response
}

export function testResponse() {
    const response = `{
        "message": "Here is a breakdown of the meeting notes:",
        "tasks": [
            {
                "id": 1,
                "task": "Send the API docs to the client",
                "owner": "Dan",
                "due_date": "Friday"
            },
            {
                "id": 2,
                "task": "Follow up with the client about onboarding",
                "owner": "Unassigned",
                "due_date": "next week"
            },
            {
                "id": 3,
                "task": "Investigate checkout bug affecting Safari users",
                "owner": "Jason",
                "due_date": null
            }
        ]
    }`

    return { text: response }
}
