<?php
// Include the database connection
include('db_connection.php');

// Query to get the notes
$query = "SELECT * FROM uploaded_notes";
$result = mysqli_query($conn, $query);

// Check if there are notes
if ($result && mysqli_num_rows($result) > 0) {
    $notes = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $notes[] = [
            'noteFileName' => $row['noteFileName'],
            'noteFileURL' => $row['noteFileURL'],
            'notePhotoURL' => $row['notePhotoURL'],
        ];
    }

    // Send the response as JSON
    echo json_encode(['success' => true, 'notes' => $notes]);
} else {
    echo json_encode(['success' => false, 'message' => 'No notes found.']);
}

// Close the database connection
mysqli_close($conn);
?>
