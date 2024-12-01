document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from submitting to the server.

    // Get entered values
    const enteredUsername = document.getElementById('username').value.trim();
    const enteredPassword = document.getElementById('password').value.trim();

    // Validation and logic here
    if (!enteredUsername || !enteredPassword) {
        alert('Please fill in both username and password.');
        return;
    }

    // Example logic for validation and redirection
    const storedUsername = localStorage.getItem('username');
    const storedHashedPassword = localStorage.getItem('password');
    const hashedEnteredPassword = CryptoJS.SHA256(enteredPassword).toString();

    if (enteredUsername === storedUsername && hashedEnteredPassword === storedHashedPassword) {
        alert('Login successful!');
        localStorage.setItem('currentUsername', enteredUsername);
        window.location.href = '../home/home.html';
    } else {
        alert('Invalid username or password.');
    }
});


function login() {
    const username = prompt("Enter your username:"); // Simulate login by asking for the username
    
    if (username) {
        document.getElementById("username").textContent = username;
        document.getElementById("welcome-message").style.display = "block";
        document.getElementById("auth-buttons").style.display = "none";
        document.getElementById("username-display").textContent = username;
    }
}

function signup() {
    alert("Redirecting to sign-up page...");
    window.location.href = "../SignUp/SignUp.html";
}

