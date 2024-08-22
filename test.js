import getData from './helper/getData.js'
import getPrompt from './helper/getPrompt.js'

import runOpenAI from './models/openai.js'
import runClaude from './models/claude.js'
import runGroq from './models/groq.js';
import runGemini from './models/gemini.js';

// Get args from command line
const model = process.argv.slice(2)[0];
const availableModels = ['openai', 'claude', 'gemini', 'groq']

if (!model) {
    console.log('Please provide a model name. Available models: ', availableModels);
    process.exit(1);
}

if (!availableModels.includes(model)) {
    console.log('Invalid model name. Available models: ', availableModels);
    process.exit(1);
}

// Prepare data
const booksData = getData('books')
const booksPrompt = getPrompt('books')

const data = {
    booksData,
    booksPrompt
}

function scoreResult(model, response) {
    const items = response.books

    // 1. Check length
    const lengthScore = (items.length === 20) ? '✅' : '❌'

    // 2. Check first item
    const refFirstItem = {
        title: 'A Light in the Attic',
        link: 'catalogue/a-light-in-the-attic_1000/index.html',
        image: 'media/cache/2c/da/2cdad67c44b002e7ead0cc35693c0e8b.jpg',
        star_rating: 3,
        price: 51.77,
        in_stock: true
    }
    const firstItem = items[0]
    const firstItemScore = (
        firstItem.title === refFirstItem.title &&
        firstItem.link === refFirstItem.link &&
        firstItem.image === refFirstItem.image &&
        firstItem.star_rating === refFirstItem.star_rating &&
        firstItem.price === refFirstItem.price &&
        firstItem.in_stock === refFirstItem.in_stock
    ) ? '✅' : '❌'
    // console.log('First item: ', firstItem)

    const refLastItem = {
        title: "It's Only the Himalayas",
        link: 'catalogue/its-only-the-himalayas_981/index.html',
        image: 'media/cache/27/a5/27a53d0bb95bdd88288eaf66c9230d7e.jpg',
        star_rating: 2,
        price: 45.17,
        in_stock: true
    }
    const lastItem = items[items.length - 1]
    const lastItemScore = (
        lastItem.title === refLastItem.title &&
        lastItem.link === refLastItem.link &&
        lastItem.image === refLastItem.image &&
        lastItem.star_rating === refLastItem.star_rating &&
        lastItem.price === refLastItem.price &&
        lastItem.in_stock === refLastItem.in_stock
    ) ? '✅' : '❌'
    // console.log('Last item: ', lastItem)

    console.log(`Model ${model} | Items length: ${lengthScore} | First item: ${firstItemScore} | Last item: ${lastItemScore}
                `)
}

// Run Models
async function run(model){
    let response;
    const start = Date.now();
    switch(model) {
        case "claude":
            response = await runClaude(data)
            break
        case "gemini":
            response = await runGemini(data)
            break
        case "groq":
            response = await runGroq(data)
            break
        case "openai":
            response = await runOpenAI(data)
            break
        default:
            console.log('Model not found')
    }

    console.log('--Time taken: ', Date.now() - start);
    scoreResult(model, response)
}

// Run model multiple timesa asyncly
const rumTimes = 5 
for (let i = 0; i < rumTimes; i++) {
    run(model)
}
