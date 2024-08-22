import dotenv from 'dotenv'
dotenv.config()

import Groq from "groq-sdk";
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});
const model = "llama3-8b-8192"

export default async function runGroq(data) {
    // Basic Chat completion
    const msg = await groq.chat.completions.create({
        model,
        messages: [
            { role: "user", content: `${data.booksPrompt}. Raw HTML: ${data.booksData}` }
        ],
        response_format: {"type": "json_object"},
        max_tokens: 10000
    })
    const response = msg.choices[0]?.message?.content
    return response
}