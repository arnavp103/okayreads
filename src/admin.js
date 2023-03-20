"use strict";


import booksJSON from "/database/books.json" assert { type: 'json' };

const queue = document.querySelector(".queue");
const picker = document.querySelector("#picker");
const submit = document.querySelector("#submit");

for (const key in booksJSON) {
	const book = booksJSON[key];

	const img = document.createElement("img");
	img.classList.add("book");
	img.setAttribute("data-key", key);
	img.setAttribute("src", book.image);
	picker.appendChild(img);

	img.addEventListener("click", () => {
		queue.appendChild(img.cloneNode());
		setQueueEventListeners();
	});
}

function setQueueEventListeners() {
	const imgs = queue.querySelectorAll("img");
	imgs.forEach(img => img.addEventListener("click", () => {
		queue.removeChild(img);
	}));
}


// clear local storage and write new data for carousel
function clearAndSet(order) {
	localStorage.clear();
	console.log(order);
	localStorage.setItem("order", JSON.stringify(order));
}


submit.addEventListener("click", () => {
	const order = [];
	const imgs = queue.querySelectorAll("img");

	imgs.forEach(img => order.push(img.getAttribute("data-key")));

	clearAndSet(order);
});







