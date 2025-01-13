<?php
include('db_connection.php');

session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User is not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];

error_log("Session user_id: " . $user_id);

$query = "SELECT username, email, phone, address, gender, birth, college, department, student_year FROM students WHERE id = ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    error_log("SQL prepare failed: " . $conn->error);
    echo json_encode(['error' => 'Failed to prepare the SQL statement']);
    exit;
}

$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
    error_log("Fetched Data: " . print_r($data, true));
    echo json_encode($data);
} else {
    error_log("No data found for user_id: " . $user_id);
    echo json_encode(['error' => 'Profile not found.']);
}

$stmt->close();
$conn->close();
?>
