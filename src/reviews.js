"use strict";

import booksJSON from "/database/books.json" assert { type: 'json' };

const reviewCount = document.querySelector("#review-count");
const avgRating = document.querySelector("#average-rating")
const bookTitle = document.querySelector("#book-title");
const bookImage = document.querySelector("#book-img");
const reviewList = document.querySelector("#user-review");
var id = 1;

window.addEventListener("DOMContentLoaded", loadPage);

//
function loadReviews() {
    var book = JSON.parse(window.localStorage.getItem(booksJSON[id].title));
    if (book == null) {
        var book = { 
            reviews: {
                user: [],
                review: [],
                rating: []
            }
        };
    }
    for (let i = 0; i < book.reviews.user.length; i++) {
        reviewList.innerHTML += `<li>
        <p class="username">${book.reviews.user[i]}<p>
        <p class="review">${book.reviews.review[i]}<p>
        <li>
        `    
    }
}

// Calculate the average rating for the book with ID id
function calculateRating (){
    book = JSON.parse(window.localStorage.getItem(booksJSON[id].title));
    if (book == null) {
        var book = { 
            reviews: {
                user: [],
                review: [],
                rating: []
            }
        };
    }   
    var avgScore = 0;

    for (var score in book.reviews.rating) {
        avgScore += parseInt(book.reviews.rating[score]);
    }

    if (avgScore == 0) {        // No reviews
        updateReview(0);
    }
    else {
        updateReview((avgScore / book.reviews.rating.length).toFixed(1));
    }
}


// Update the page with a new review count and score average
function updateReview (avgScore){
    book = JSON.parse(window.localStorage.getItem(booksJSON[id].title));
    if (book == null) {
        var book = { 
            reviews: {
                user: [],
                review: [],
                rating: []
            }
        };
    } 
    id = getBookID();
    reviewCount.innerHTML = "(" + book.reviews.rating.length + ")";
    avgRating.innerHTML = avgScore + "★";
}

// Get the ID of the book to display
function getBookID() {
    const keys = Object.keys(booksJSON);
    for (let i = 1; i < keys.length + 1; i++){
        if (booksJSON[i].title == window.localStorage.getItem("Title")) {
            return i;
        }
    }
}

// When the page is loaded, load information about book
function loadPage() {
    loadBook();
    calculateRating();
    loadReviews();
}

// Load book information to page
function loadBook() {
     id = getBookID();

    document.title = booksJSON[id].title;
    bookTitle.innerHTML = booksJSON[id].title;
    bookImage.src = booksJSON[id].image;
}
