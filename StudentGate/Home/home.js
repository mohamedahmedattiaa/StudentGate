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
    } else {
        usernameDisplay.textContent = 'User';
    }
};
window.addEventListener('DOMContentLoaded', function() {
    const currentUsername = localStorage.getItem('currentUsername');
    const elements = {
        loginBtn: document.querySelector('.login-btn'),
        signupBtn: document.querySelector('.signup-btn'),
        logoutBtn: document.querySelector('.logout-btn'),
        usernameDisplay: document.getElementById('username')
    };

    if (currentUsername) {
        elements.usernameDisplay.textContent = currentUsername;
        elements.loginBtn.style.display = 'none';
        elements.signupBtn.style.display = 'none';
        elements.logoutBtn.style.display = 'block';
    } else {
        elements.loginBtn.style.display = 'block';
        elements.signupBtn.style.display = 'block';
        elements.logoutBtn.style.display = 'none';
    }
});


function logout() {
    // Clear the username from localStorage
    localStorage.removeItem('currentUsername');
    
    // Redirect to the login page
    window.location.href = '../login/login.html';
}