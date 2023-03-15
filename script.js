"use strict";

// carousel_controls
const arrows = document.querySelectorAll(".arrow");
const carousel = document.querySelector(".carousel-inner");
const books = document.querySelectorAll(".book");

// navbar and controls
const navbar = document.getElementById("navbar");

const navbarButton = document.getElementById("")

// Open nav bar
function openNav() {

    navbar.style.width = "200px";
}

// Close nav bar
function closeNav() {
    navbar.style.wideth = "0";
}


arrows[0].addEventListener("click", () => {
	const dx = books[0].clientWidth;
	carousel.scrollLeft -= dx;
});

arrows[1].addEventListener("click", () => {
	const dx = books[0].clientWidth;
	carousel.scrollLeft += dx;
});

for (const book of books) {
	book.style.background = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}