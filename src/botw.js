import booksJSON from "../database/books.json" assert { type: 'json' };

const reviewButton = document.querySelector("#write-review");
const reviewField = document.querySelector("#review-input");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookSummary = document.querySelector("#book-summary");
const bookImage = document.querySelector("#book-img");

reviewButton.addEventListener("click", submitReview);
window.addEventListener("DOMContentLoaded", loadPage);

function submitReview(){
    // TODO: Check if user exists first
    if (reviewField.value == "") {
        // Give user an error message
        console.log("nothing");
    }
    else {
        // Save to review db?
        console.log(reviewField.value);
        reviewField.value = "";
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
    return 2;
}
