import dotenv from 'dotenv'
dotenv.config()

import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
  

const BooksFormat = z.object({
    books: z.array(
        z.object({
            title: z.string(),
            link: z.string(),
            image: z.string(),
            star_rating: z.number(),
            price: z.number(),
            in_stock: z.boolean(),
        })
    )
});

export default async function runOpenAI(data) {
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
        { role: "system", content: "Extract the books information from the raw HTML." },
        { role: "user", content: data.booksData },
        ],
        response_format: zodResponseFormat(BooksFormat, "books"),
    });
    
    const parsedData = completion.choices[0].message.parsed
    return parsedData
}
