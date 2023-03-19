"use strict";

import booksJSON from "/database/books.json" assert { type: 'json' };

const reviewCount = document.querySelector("#review-count");
const avgRating = document.querySelector("#average-rating");
const reviewButton = document.querySelector("#write-review");
const reviewField = document.querySelector("#review-input");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookSummary = document.querySelector("#book-summary");
const bookImage = document.querySelector("#book-img");
var stars = document.querySelector('input[name="rating"]:checked');
var id = 1;

window.addEventListener("DOMContentLoaded", loadPage);
reviewButton.addEventListener("click", submitReview);

function submitReview(){
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
    // Get new star rating at the time of review submission
    stars = document.querySelector('input[name="rating"]:checked');
    const activeUser = window.localStorage.getItem("activeUser");
    if (reviewField.value == "") {
        // Give user an error message
        alert("Please write a review before submitting.")
    }
    else {
        // Save to review local storage
        console.log(activeUser);
        var i = reviewHasNoValue(book.reviews.user, activeUser)
        if (i != -1){
            book.reviews.user[i] = activeUser;
            book.reviews.review[i] = reviewField.value;
            book.reviews.rating[i] = parseInt(stars.value);
        }
        else {
            book.reviews.user[book.reviews.user.length] = activeUser;
            book.reviews.review[book.reviews.review.length] = reviewField.value;
            book.reviews.rating[book.reviews.rating.length] = parseInt(stars.value);
        }
        reviewField.value = "";
        window.localStorage.setItem(booksJSON[id].title, JSON.stringify(book));
    }
    calculateRating();
}

function reviewHasNoValue (user_arr, username){
    for(let i = 0; i < user_arr.length; i++) {
        if (user_arr[i] == username) {
            return i;
        }
    }
    return -1;
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
    for (let i = 1; i < keys.length; i++){
        if (booksJSON[i].title == window.localStorage.getItem("Title")) {
            return i;
        }
    }
    return -1;
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
    bookSummary.innerHTML = booksJSON[id].synopsis;
    bookAuthor.innerHTML = booksJSON[id].author;
}
