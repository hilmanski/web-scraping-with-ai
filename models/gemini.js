import dotenv from 'dotenv'
dotenv.config()

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generation_config: {"response_mime_type": "application/json"}
});

export default async function runGemini(data) {
    const prompt = `${data.booksPrompt}. Raw HTML: ${data.booksData}`
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let items = response.text();

    // check if text include ```json
    // convert string to JSON
    if (items.includes('```json')) {
        // Remove the extra characters
        let cleanJsonString = items.replace(/\`\`\`json\n|\`\`\`/g, '');
        items = JSON.parse(cleanJsonString);
    }

    return items
}
