<?php
// Include database connection file
include('db_connection.php');

// Start session to store user data if login is successful
session_start();

// Get raw POST data from the frontend
$data = json_decode(file_get_contents('php://input'), true);

// Get username and password from the data
$username = isset($data['username']) ? trim($data['username']) : '';
$password = isset($data['password']) ? trim($data['password']) : '';

// Validate input: Ensure both username and password are provided
if (empty($username) || empty($password)) {
    echo json_encode(["message" => "Username and password are required."]);
    exit();
}

// Prepare SQL statement to prevent SQL injection
$stmt = $conn->prepare("SELECT id, username, password FROM students WHERE username = ?");
$stmt->bind_param("s", $username);

// Execute the query
if (!$stmt->execute()) {
    echo json_encode(["message" => "Error executing query: " . $stmt->error]);
    exit();
}

// Get the result
$result = $stmt->get_result();

// Check if user exists
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Check if the password is already hashed in the database
    // You can assume a hashed password has a specific length (e.g., 60 characters for bcrypt)
    if (strlen($user['password']) !== 60) {
        // If password is not hashed, hash it and update the database
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Update the password in the database (you can use a prepared statement for this)
        $update_stmt = $conn->prepare("UPDATE students SET password = ? WHERE id = ?");
        $update_stmt->bind_param("si", $hashed_password, $user['id']);
        $update_stmt->execute();
        $update_stmt->close();
        
        // Now, verify the entered password against the newly hashed password
        if (password_verify($password, $hashed_password)) {
            // Set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            echo json_encode([
                "success" => true,
                "message" => "Logged in successfully!",
                "user" => $user
            ]);
        } else {
            echo json_encode(["message" => "Invalid password."]);
        }
    } else {
        // If password is already hashed, verify it
        if (password_verify($password, $user['password'])) {
            // Set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            echo json_encode([
                "success" => true,
                "message" => "Logged in successfully!",
                "user" => $user
            ]);
        } else {
            echo json_encode(["message" => "Invalid password."]);
        }
    }
} else {
    echo json_encode(["message" => "User not found."]);
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
