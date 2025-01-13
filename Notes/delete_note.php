<?php
// Include the database connection
include('db_connection.php');

// Check if the note filename is set
if (isset($_POST['noteFileName'])) {
    $noteFileName = $_POST['noteFileName'];

    // Delete the note from the database
    $query = "DELETE FROM uploaded_notes WHERE noteFileName = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, 's', $noteFileName);

    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(['success' => true, 'message' => 'Note deleted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error deleting note']);
    }

    // Close the statement and connection
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
} else {
    echo json_encode(['success' => false, 'message' => 'No note file specified']);
}
?>
