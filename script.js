"use strict";

// carousel_controls
const arrows = document.querySelectorAll(".arrow");
const carousel = document.querySelector(".carousel-inner");
const books = document.querySelectorAll(".book-card");

// navbar and controls
const navbar = document.getElementById("navbar");

const navbarButton = document.getElementById("");

// Open nav bar
function openNav() {
	navbar.style.width = "200px";
}

// Close nav bar
function closeNav() {
	navbar.style.wideth = "0";
}

for (const book of books) {
	book.style.background = `rgb(${Math.random() * 255}, ${
		Math.random() * 255
	}, ${Math.random() * 255})`;
}

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
	console.log(current);
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
