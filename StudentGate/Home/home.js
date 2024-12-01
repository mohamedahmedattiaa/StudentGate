// Initialize Swiper for the slider
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    spaceBetween: 20,
    centeredSlides: true,
    slidesPerView: 1,
});

// Display username on page load
window.onload = function () {
    const username = localStorage.getItem('currentUsername');
    
    // Show username or default message
    const usernameDisplay = document.getElementById('username-display');
    if (username) {
        usernameDisplay.textContent = username;
        document.getElementById('welcome-message').style.display = 'block';
    } else {
        usernameDisplay.textContent = 'User';
    }
};
window.addEventListener('DOMContentLoaded', function() {
    // Retrieve the username from localStorage
    const currentUsername = localStorage.getItem('currentUsername');
    
    // Elements to show/hide based on login status
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const logoutBtn = document.querySelector('.logout-btn');
    const welcomeMessage = document.getElementById('welcome-message');

    // If the user is logged in, show the welcome message and hide login/sign up buttons
    if (currentUsername) {
        welcomeMessage.style.display = 'block';
        document.getElementById('username').textContent = currentUsername; // Display the username
        loginBtn.style.display = 'none'; // Hide the login button
        signupBtn.style.display = 'none'; // Hide the signup button
        logoutBtn.style.display = 'block'; // Show the logout button
    } else {
        // If not logged in, show the login/signup buttons and hide the logout button
        loginBtn.style.display = 'block';
        signupBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
});

function logout() {
    // Clear the username from localStorage
    localStorage.removeItem('currentUsername');
    
    // Redirect to the login page
    window.location.href = '../login/login.html';
}