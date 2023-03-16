"use strict";

// carousel_controls
const arrows = document.querySelectorAll(".arrow");

const books = document.querySelectorAll(".book");

// navbar and controls
const navbar = document.getElementById("navbar");

const navbarButton = document.getElementById("navbarToggle");

// Open nav bar
function toggleNavbar(x) {
    x.classList.toggle("change");
    if (navbar.style.width.localeCompare("0") == 0) {
        // Expand navbar
        navbar.style.width = "200px";
    }
    else {
        // Collapse navbar
        navbar.style.width = "0";
    }
}

function changeNavVis(login, username) {
    // Logged in
    if (login) {
        document.getElementById("login").innerHTML = <a href='#'>Logout</a> // Change href to login page
        document.getElementById("welcome_msg").innerHTML = "Welcome, ".concat(username);
        document.getElementById("welcome_msg").style.visibility = "visible"; // Show welcome message
        if (username.localeCompare("admin")) {
            document.getElementById("adminpage").style.visibility = "collapse";
        }
    }
    // Logged out
    else {
        document.getElementById("login").innerHTML = <a href='#'>Login</a> // Change href to main page
        document.getElementById("welcome_msg").style.visibility = "collapse";
    }
}
