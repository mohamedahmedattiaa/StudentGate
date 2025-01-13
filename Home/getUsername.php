<?php
session_start(); // Start the session

// Database connection
$host = "localhost";
$dbname = "studentgate";
$username = "root"; // Change this according to your setup
$password = ""; // Change this according to your setup

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the user is logged in (example: using session)
    if (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];

        // Fetch the username from the database
        $stmt = $conn->prepare("SELECT username FROM students WHERE id = :id");
        $stmt->bindParam(':id', $userId);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode(['username' => $result['username']]);
        } else {
            echo json_encode(['username' => null]);
        }
    } else {
        echo json_encode(['username' => null]);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
