import booksJSON from "/database/books.json" assert { type: 'json' };

const reviewButton = document.querySelector("#write-review");
const reviewField = document.querySelector("#review-input");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookSummary = document.querySelector("#book-summary");
const bookImage = document.querySelector("#book-img");
var stars = document.querySelector('input[name="rating"]:checked');

reviewButton.addEventListener("click", submitReview);
window.addEventListener("DOMContentLoaded", loadPage);

function submitReview(){
    // Get new star rating at the time of review submission
    stars = document.querySelector('input[name="rating"]:checked');
    // TODO: Check if user exists first
    if (reviewField.value == "") {
        // Give user an error message
        console.log("nothing");
        console.log("Please write a review before submitting.");
    }
    else {
        // Save to review db?
        console.log(reviewField.value);
        reviewField.value = "";
        console.log(stars.value);
    }
}

function loadPage() {
    loadBook();
}

function loadBook() {
    const id = getBookID();
    
    document.title = booksJSON[id].title;
    bookTitle.innerHTML = booksJSON[id].title;
    bookAuthor.innerHTML = booksJSON[id].author;
    bookSummary.innerHTML = booksJSON[id].summary;
    bookImage.src = booksJSON[id].image;
}

function getBookID() {
    return 1;
}