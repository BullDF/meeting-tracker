import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })

export async function makeAPICall(notes) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: "Explain how AI works in a few words"
    })

    return response
}
