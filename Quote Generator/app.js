const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//Get quote from api
async function getQuote() {
  loading();
  const proxyUrl = "https://whispering-tor-04671.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    quoteText.innerText = data.quoteText;
    if (data.quoteText.length > 120) {
      quoteText.classList.toggle("long-quote");
    }
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    //stop loader
    complete();
  } catch (error) {
    getQuote();
  }
}

const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl);
};
//loader
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};
//hide loading
const complete = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};
//add event listener for the twitter button and for the new quote btn
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);
//on load
getQuote();
