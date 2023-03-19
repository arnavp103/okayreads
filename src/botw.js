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
    id = getBookID();
    // Get new star rating at the time of review submission
    stars = document.querySelector('input[name="rating"]:checked');
    // TODO: Check if user exists first
    if (reviewField.value == "") {
        // Give user an error message
        console.log("nothing");
        console.log("Please write a review before submitting.");
    }
    else {
        // Save to review db
        console.log(reviewField.value);
        reviewField.value = "";
        console.log(stars.value);
        booksJSON[id].rating.push(stars.value);
    }
    calculateRating();
}

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
    const keys = Object.keys(booksJSON);
    for (let i = 1; i < keys.length; i++){
        console.log(booksJSON[i].title === window.localStorage.getItem("Title"));
        if (booksJSON[i].title == window.localStorage.getItem("Title")) {
            return i;
        }
    }

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
    bookSummary.innerHTML = booksJSON[id].summary;
    bookAuthor.innerHTML = booksJSON[id].author;
}
