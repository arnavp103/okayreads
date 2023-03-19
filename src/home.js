"use strict";

import booksJSON from "/database/books.json" assert { type: 'json' };

// carousel_controls
const arrows = document.querySelectorAll(".arrow");
const carousel = document.querySelector(".carousel-inner");

// --- populate carousel -----
/// order is a list of book ids in the same order as the carousel
/// eg. ["1", "2"] -> ["Lord of the Rings", "To Kill a Mockingbird"]
function populate(order) {
	for (const key of order) {
		const book = booksJSON[key];
		const section = document.createElement("section");
		section.classList.add("book-card");
		section.setAttribute("data-name", book.title);
		section.innerHTML = `
			<img src="${book.image}" alt="${book.title}">
			<div class="highlight synopsis">${book.synopsis}</div>
			<div class="redirects">
				<button>Reviews</button>
			</div>
		`;
		carousel.appendChild(section);
	}
}

if (!localStorage.getItem("order")) {
	const defaultOrder = ["1", "3", "4", "5", "6"];
	populate(defaultOrder);
} else {
	const order = localStorage.getItem("order");
	populate(order);
}
// ----------------------------
const books = document.querySelectorAll(".book-card");



//-- auto scroll carousel -----
const duration = 2500;
let current = 0; // current slide
let lastFocused = 0; // time of last focused slide
// should contain hovering, clicking, dragging, etc and all mobile aswell
const eventsThatFocus = ["mousemove", "mouseover", "touchmove", "touchstart", "scroll"];
eventsThatFocus.map(event => {
    carousel.addEventListener(event, () => {
        // console.log(event);
		lastFocused = Date.now();
	});
});

function isInViewport(elem) {
    const rect = elem.getBoundingClientRect();
	return (
        rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <=
			(window.innerWidth || document.documentElement.clientWidth)
	);
}

let interval = setInterval(() => {
	if (Date.now() - lastFocused > duration) {
		current = Array.from(books).findIndex(book => isInViewport(book));
		if (current < books.length - 1) {
			arrows[1].click();
			current++;
		} else {
			for(const _ of books) {
				const dx = books[0].clientWidth;
				carousel.scrollLeft -= books.length * dx;
			}
			current = 0;
		}
		lastFocused = Date.now();
	}
	// console.log(current);
}, 1000);

//-----------------------------
arrows[0].addEventListener("click", () => {
    const dx = books[0].clientWidth;
	carousel.scrollLeft -= dx;
});

arrows[1].addEventListener("click", () => {
    const dx = books[0].clientWidth;
	carousel.scrollLeft += dx;
});
