let apiQuotes =[];

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const author = document.getElementById('author');
const btnNext = document.getElementById('btn-next');

const loader = document.getElementById('loader');


// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


//show the new quotes
function newQuotes(){
    //to pick random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // console.log(quote);

    // Check Author is blank then replace with 'Unkown'
    if(!quote.author){
        author.textContent='Unkown';
    }else{
        author.textContent=quote.author;
    }
    
    //check quote length determines style
    // if (quote.quoteText.length>120) {
    //     quoteText.classList.add('long-quote')
    // }else
    // {
    //     quoteText.classList.remove('long-quote')
    // }
    quoteText.textContent = quote.text;
}


//get quote  from api
async function getQuote(){
    loading();
    const url="https://type.fit/api/quotes"
    try {
        const response=await fetch(url)
        apiQuotes=await response.json();
        // console.log(apiQuotes[5]);
        newQuotes();
        complete();
    } catch (error) {
        // console.log(error); 
        getQuote()
    }
}

//event listeners in new button
btnNext.addEventListener('click',newQuotes);

//onload
getQuote();