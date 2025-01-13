<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'studentgate';
$user = 'root';
$password = '';

error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    // Connect to the database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get the JSON data sent via POST
    $data = json_decode(file_get_contents('php://input'), true);

    // Log the received data for debugging
    file_put_contents('log.txt', print_r($data, true));

    // Validate the received data
    if (isset($data['name']) && isset($data['price'])) {
        $itemName = $data['name'];
        $itemPrice = $data['price'];

        // Insert the item into the `cart` table
        $stmt = $pdo->prepare("INSERT INTO products (name, price, added_to_cart) VALUES (?, ?, 1)");
        $stmt->execute([$itemName, $itemPrice]);

        // Check if the insertion was successful
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Product added to cart successfully!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to add product to cart.']);
        }
    } else {
        // Invalid data
        echo json_encode(['success' => false, 'message' => 'Invalid input data']);
    }
} catch (PDOException $e) {
    // Return an error response
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
