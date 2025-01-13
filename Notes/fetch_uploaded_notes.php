<?php
include('db_connection.php');

// Query to fetch uploaded notes
$query = "SELECT noteFileName, noteFileURL, notePhotoURL FROM uploaded_notes";
$result = mysqli_query($conn, $query);

if ($result) {
    $uploadedNotes = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $uploadedNotes[] = $row;
    }
    // Return the uploaded notes as JSON
    echo json_encode($uploadedNotes);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to fetch uploaded notes']);
}

// Close the database connection
mysqli_close($conn);
?>
