
const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

document.addEventListener('DOMContentLoaded', function () {
    const usernameSpan = document.getElementById('username');
    const welcomeMessage = document.getElementById('welcome-message');
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const logoutBtn = document.querySelector('.logout-btn');

    fetch('getUsername.php')
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                // User is logged in
                usernameSpan.textContent = data.username;
                welcomeMessage.style.display = 'block';
                loginBtn.style.display = 'none';
                signupBtn.style.display = 'none';
                logoutBtn.style.display = 'block';
            } else {
                // User is not logged in
                welcomeMessage.style.display = 'none';
                loginBtn.style.display = 'block';
                signupBtn.style.display = 'block';
                logoutBtn.style.display = 'none';
            }
        })
        .catch(error => console.error('Error fetching user info:', error));
});

function logout() {
    fetch('logout.php', { method: 'POST' })
        .then(response => {
            if (response.ok) {
                window.location.reload(); // Reload the page to reset the state
            } else {
                console.error('Logout failed.');
            }
        })
        .catch(error => console.error('Logout error:', error));
}
