"use strict";

async function login() {
    const uname = document.getElementById("uname");
    const pw = document.getElementById("pw");
    const response = await fetch('../database/users.json');
    const users = await response.json();
    Object.keys(users).forEach(function(key) {
        // Check credentials with each JSON entry
        if ((uname.value === users[key]["username"]) && (pw.value === users[key]["password"])) { // Credentials found
            window.location.href = "/pages/home.html"; // Redirect to home
            console.log("Done");
            const setNavElementVis = require("./home.js");
            setNavElementVis(true, username);
            return;
        }
    })
    // Credentials not found
    alert("Incorrect username or password! Please try again.");
}

document.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        login();
    }
})

login_button.addEventListener("click", () => {
    login();
});

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
    