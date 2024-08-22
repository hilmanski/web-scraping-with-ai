import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

export default function getData(dataName) {
    switch(dataName) {
        case 'books':
            return getBooks()
            break
        default:
            return 'No data found'
    }
}


// load file from ./data/books.txt
function getBooks() {
    // change it to books.txt for real test not books-simple
    // const filePath = path.join(__dirname, '../data/books-simple.txt')
    const filePath = path.join(__dirname, '../data/books-simple.txt')
    const data = fs.readFileSync(filePath, 'utf-8')
    return data.trim()
}