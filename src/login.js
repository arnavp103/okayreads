"use strict";

const uname = document.getElementById("uname");
const pw = document.getElementById("pw");

function login() {
    fetch('./database/users.json')
        .then((response) => response.json())
        .then((json) => console.log(json));
}

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
    