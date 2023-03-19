import booksJSON from "/database/books.json" assert { type: 'json' };

const reviewCount = document.querySelector("#review-count");
const avgRating = document.querySelector("#average-rating")
const bookTitle = document.querySelector("#book-title");
const bookImage = document.querySelector("#book-img");
var id = 1;

window.addEventListener("DOMContentLoaded", loadPage);

// Calculate the average rating for the book with ID id
function calculateRating (){
    id = getBookID();
    var avgScore = 0;

    for (var score in booksJSON[id].rating) {
        avgScore += parseInt(booksJSON[id].rating[score]);
    }

    if (avgScore == 0) {        // No reviews
        updateReview(0);
    } 
    else {
        updateReview((avgScore / booksJSON[id].rating.length).toFixed(1));
    }
}

// Update the page with a new review count and score average
function updateReview (avgScore){
    id = getBookID();
    reviewCount.innerHTML = "(" + booksJSON[id].rating.length + ")";
    avgRating.innerHTML = avgScore + "★";
}

// Get the ID of the book to display
function getBookID() {
    return 1;
}

// When the page is loaded, load information about book
function loadPage() {
    loadBook();
    calculateRating();
}

// Load book information to page
function loadBook() {
     id = getBookID();
    
    document.title = booksJSON[id].title;
    bookTitle.innerHTML = booksJSON[id].title;
    bookImage.src = booksJSON[id].image;
}
