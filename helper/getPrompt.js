// Not used for now
export default function getPrompt(dataName) {
    switch(dataName) {
        case 'books':
            return getBooksPrompt()
            break
        default:
            return 'No prompt found'
    }
}


function getBooksPrompt() {
    return `
    Parse the HTML and collect only information about books, get all the books, not just partially.
    Convert it into a JSON object with the following structure. 
    No explanation needed, don't response anything except the JSON object:
        {
            "books": [
                {
                    "title": $title,
                    "link": $link,
                    "image": $image,
                    "star_rating": $star_rating, (number)
                    "price": $price, (number)
                    "in_stock": $in_stock_status, (boolean)
                },
                ...
        }
    `
}