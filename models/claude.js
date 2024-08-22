import dotenv from 'dotenv'
dotenv.config()

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
});

export default async function runClaude(data) {
    const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 4096,
        messages: [
            { role: "user", content: `${data.booksPrompt}. Raw HTML: ${data.booksData}` }
        ],
    });
    const response = JSON.parse(msg.content[0].text)
    return response
}