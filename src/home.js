"use strict";

// carousel_controls
const arrows = document.querySelectorAll(".arrow");
const carousel = document.querySelector(".carousel-inner");
const books = document.querySelectorAll(".book-card");

// navbar and controls
const navbar = document.getElementById("navbar");

const navbarButton = document.getElementById("");


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

//---------------------------

// Open nav bar
function toggleNavbar() {
    const navbar = document.getElementById("navBar");
    try {
        changeNavIcon();
        if (navbar.style.width.localeCompare("0px") == 0 || navbar.style.width.localeCompare("") == 0) {
            // Expand navbar
            navbar.style.width = "200px";
        }
        else {
            // Collapse navbar
            navbar.style.width = "0";
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

// Change nav bar icon
function changeNavIcon() {
    const navbarIcon = document.getElementById("navbarToggle");
    navbarIcon.classList.toggle("change"); // Change navbar icon
}

// Call on start and login/logout
export function setNavElementVis(login, username) {
    // Logged in
    if (login) {
        document.getElementById("login").innerHTML = "Logout"
        document.getElementById("login").href = "#" // Change to login page
        document.getElementById("welcome_msg").textContent = "Welcome, ".concat(username);
        document.getElementById("welcome_msg").style.visibility = "visible"; // Show welcome message
        if (username.localeCompare("admin")) {
            document.getElementById("adminpage").style.visibility = "visible"; // Only user "admin" should see "admin" option
        }
    }
    // Logged out
    else {
        document.getElementById("login").innerHTML = "Logout"
        document.getElementById("login").href = "#" // Change to login page
        document.getElementById("welcome_msg").style.visibility = "collapse";
        document.getElementById("adminpage").style.visibility = "collapse"
    }
}