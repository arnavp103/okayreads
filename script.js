"use strict";

// carousel_controls
const arrows = document.querySelectorAll(".arrow");
const carousel = document.querySelector(".carousel-inner");
const books = document.querySelectorAll(".book");

// navbar and controls
const navbar = document.getElementById("navBar");

const navbarIcon = document.getElementById("navbarToggle");

// Open nav bar
function toggleNavbar() {
    try {
        changeNavIcon();
        console.log(navbar.style.width);
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
    navbarIcon.classList.toggle("change"); // Change navbar icon
}

// Call on start and login/logout
function changeNavElementVis(login, username) {
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