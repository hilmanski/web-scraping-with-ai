# About
Experiment on measuring 4 different top AI models on web scraping

Old refrence: https://serpapi.com/blog/web-scraping-and-parsing-experiment-with-ai-openai/

## Usage
```
node test (choose one: openai/claude/gemini/groq)
```

*Using Groq is currently not possible due to the token limitation.

## Methods
Test on this page https://books.toscrape.com/ 
TODO: Find more difficult test

We'll use a static raw HTML text to parse. *We're skipping the request to HTML part.

I provided two data samples in `/data`:
1. books (whole body Raw HTML) - more real-life scenario but more token
2. books-simple (I cut only the relevant part) - less token

*You can switch this two in `/helper/getData.js`


## TODO
- [X] Determine 3 different cases
- [X] Start working on code structure
    - make it easy to switch test using -- args on command?

- [X] Auto test and Score Result
    it should run test in parallel using "async" for all tests
    it should auto run the results as well (test score)
    - check all keys availability
    - check all keys value

- [ ] Write blog post
    - Think of "engaging the reader" from start to finish / 
    - think of the overall flow/hook nicely
    - warn on the blog post - why not just copy-paste the raw HTML to fetch (high cost)

## Logs
22/Aug/24
    - Replace OpenAI function calling with new Output structured feature
    - Gemini return the data as string, to keep it consisten make an if conditional and remove the string helper
Tue: 9/July/24
    For OpenAI - using vanilla chatCompletion takes along time compare the old test with function calling
    [DONE] OpenAI function calling
Wed: 10/July/24
    [DONE] Claude integrate nicely with just chatCompletion
    Groq can't return in consistent format. Let's try using the function calling
    [Failed] Groq can't return consistent result in the function calling
    [DONE] Gemini AI integration
