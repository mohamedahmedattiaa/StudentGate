<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'studentgate';
$user = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the request is to clear the entire cart
    $data = json_decode(file_get_contents('php://input'), true);
    if ($data['action'] == 'clear') {
        // Remove all items from the cart
        $stmt = $pdo->prepare("DELETE FROM products");
        $stmt->execute();
        echo json_encode(['success' => true]);
    } else {
        // Otherwise, remove a specific item
        $stmt = $pdo->prepare("DELETE FROM cart WHERE id = :id");
        $stmt->execute(['id' => $data['id']]);
        echo json_encode(['success' => true]);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
