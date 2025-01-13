<?php
session_start(); // Start the session

// Destroy the session to log the user out
session_unset(); // Remove all session variables
session_destroy(); // Destroy the session

// Redirect the user to the login page or homepage
header("Location: ../login/login.html"); // Or use your preferred URL
exit();
?>
