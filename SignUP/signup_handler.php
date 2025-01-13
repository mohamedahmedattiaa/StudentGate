<?php
// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Get the raw POST data
$inputData = file_get_contents('php://input');
error_log("Received Data: " . $inputData); // Log the raw POST data

// Decode the JSON data
$data = json_decode($inputData, true);

// Check if decoding was successful
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["message" => "Invalid JSON data", "error" => json_last_error_msg()]);
    exit;
}

// Sanitize the received data
$fields = ['username', 'password', 'email', 'gender', 'birth', 'phone', 'address', 'college', 'department', 'student_year', 'skills', 'hobbies', 'languages', 'activities', 'scholarships'];
foreach ($fields as $field) {
    if (isset($data[$field])) {
        $data[$field] = htmlspecialchars($data[$field], ENT_QUOTES, 'UTF-8');
    } else {
        $data[$field] = null; // Set as null if the field is missing
    }
}

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "studentgate";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Database connection failed", "error" => $conn->connect_error]));
}

// Prepare SQL statement
$stmt = $conn->prepare("INSERT INTO students (username, password, email, gender, birth, phone, address, college, department, student_year, skills, hobbies, languages, activities, scholarships) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param(
    "sssssssssssssss",
    $data['username'],
    $data['password'],
    $data['email'],
    $data['gender'],
    $data['birth'],
    $data['phone'],
    $data['address'],
    $data['college'],
    $data['department'],
    $data['student_year'],
    $data['skills'],
    $data['hobbies'],
    $data['languages'],
    $data['activities'],
    $data['scholarships']
);

// Execute the statement and handle the result
if ($stmt->execute()) {
    echo json_encode(["message" => "User registered successfully!"]);
} else {
    echo json_encode(["message" => "SQL Execution Error", "error" => $stmt->error]);
    error_log("SQL Error: " . $stmt->error);
}

$stmt->close();
$conn->close();
?>
