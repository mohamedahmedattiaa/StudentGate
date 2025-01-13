document.addEventListener('DOMContentLoaded', () => {
    // Event listener for form submission
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Check if username and password are provided
        if (!username || !password) {
            alert('Please enter your username and password.');
            return;
        }

        try {
            console.log('Sending login data...');
            const response = await fetch('login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Ensure it's sent as JSON
                },
                body: JSON.stringify({ username, password }) // Send username and password as JSON
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Parsed Server Response:', result);

            // Handle server response
            if (result.success) {
                alert(result.message);
                window.location.href = '../Home/home.html';  // Redirect on success
            } else {
                alert(result.message || 'Invalid login credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred while trying to log in. Please try again later.');
        }
    });

    // Event listener for Sign Up button
    document.getElementById('signupBtn').addEventListener('click', () => {
        window.location.href = '../SignUp/SignUp.html'; // Redirect to the Sign Up page
    });
});
