"use strict";

const navbar = document.getElementById("navbar");
const navbarButton = document.getElementById("navbarToggle");
    
    
window.onload = init_navbar();

function checkLogin() {
    // User logged in
    return localStorage.getItem("activeUser") != null;
}
    
function init_navbar() {
    // Init links
    document.getElementById("homepage").href = "/pages/home.html";
    document.getElementById("adminpage").href = "/pages/admin.html";
    // document.getElementById("reviewpage").href = "/pages/reviews.html";
    document.getElementById("login").href = "/pages/login.html";

    // No user logged in
    if (!checkLogin()) {
        document.getElementById("adminpage").style.display = "none"; // Remove "Admin"
        document.getElementById("login").innerText = "Login";
        document.getElementById("welcome_msg").innerHTML = "Welcome to Okayreads.<br>Please login.";
    }
    // User logged in
    else {
        document.getElementById("adminpage").style.display = "none"; // Remove "Admin"
        document.getElementById("login").innerText = "Logout";
        document.getElementById("welcome_msg").innerText = "Welcome " + localStorage.getItem("activeUser"); // Set welcome message
        // Admin login
        if (localStorage.getItem("activeUser") === "admin") {
            document.getElementById("adminpage").style.display = "block"; // Show "Admin"
        }
    }
}

navbarButton.addEventListener("click", () => {
    changeNavIcon();
    toggleNavbar();
})

document.getElementById("login").addEventListener("click", () => {
    // Logged in
    if (checkLogin()) {
        // Logout
        localStorage.removeItem("activeUser");
    }
})

// Open nav bar
function toggleNavbar() {
    try {
        // Mobile view
        if (window.innerWidth <= 450) {
            navbar.style.paddingTop = (document.querySelector("header").offsetHeight).toString() + "px";
            navbar.style.width = "100%";
            if (navbar.style.height.localeCompare("100%") == 0) {
                navbar.style.height = "0px";
            }
            if (navbar.style.height.localeCompare("0px") == 0 || navbar.style.height.localeCompare("") == 0) {
                // Expand navbar
                navbar.style.paddingTop = (document.querySelector("header").offsetHeight + 3).toString() + "px";
                navbar.style.height = "300px";
            }
            else {
                // Collapse navbar
                navbar.style.height = "0px";
            }
        }
        // Desktop view
        else {
            navbar.style.height = "100%";
            navbar.style.paddingTop = (document.querySelector("header").offsetHeight).toString() + "px";
            if (navbar.style.width.localeCompare("100%") == 0) {
                navbar.style.width = "0px";
            }
            if (navbar.style.width.localeCompare("0px") == 0 || navbar.style.width.localeCompare("") == 0) {
                // Expand navbar
                navbar.style.paddingTop = (document.querySelector("header").offsetHeight + 3).toString() + "px";
                navbar.style.width = "200px";
            }
            else {
                // Collapse navbar
                navbar.style.width = "0px";
            }
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
// // Call on start and login/logout
// function setNavElementVis(username) {
//     // Logged in
//     if (checkLogin()) {
//         document.getElementById("login").innerHTML = "Logout"
//         document.getElementById("login").href = "#" // Change to login page
//         document.getElementById("welcome_msg").textContent = "Welcome, ".concat(username);
//         document.getElementById("welcome_msg").style.visibility = "visible"; // Show welcome message
//         if (username.localeCompare("admin")) {
//             document.getElementById("adminpage").style.visibility = "visible"; // Only user "admin" should see "admin" option
//         }
//     }
//     // Logged out
//     else {
//         document.getElementById("login").innerHTML = "Logout"
//         document.getElementById("login").href = "#" // Change to login page
//         document.getElementById("welcome_msg").style.visibility = "collapse";
//         document.getElementById("adminpage").style.visibility = "collapse"
//     }
// }