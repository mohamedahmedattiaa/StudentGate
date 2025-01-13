<?php
include('db_connection.php');

// Handle file upload and save to the database
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['note-file'], $_FILES['note-photo'])) {
    $noteFile = $_FILES['note-file'];
    $notePhoto = $_FILES['note-photo'];

    // Define allowed file types
    $allowedNoteTypes = ['application/pdf'];
    $allowedPhotoTypes = ['image/jpeg', 'image/png'];

    // Validate file types
    if (in_array($noteFile['type'], $allowedNoteTypes) && in_array($notePhoto['type'], $allowedPhotoTypes)) {
        
        // Validate file size (optional)
        $maxFileSize = 5 * 1024 * 1024; // 5 MB limit for both files
        if ($noteFile['size'] > $maxFileSize || $notePhoto['size'] > $maxFileSize) {
            echo json_encode(['success' => false, 'message' => 'File size exceeds the limit (5MB).']);
            exit;
        }

        // Set unique filenames to prevent overwrite
        $noteFileName = uniqid() . '-' . basename($noteFile['name']);
        $notePhotoName = uniqid() . '-' . basename($notePhoto['name']);

        // Set paths for saving
        $uploadDirectory = 'uploads/';
        $noteFilePath = $uploadDirectory . $noteFileName;
        $notePhotoPath = $uploadDirectory . $notePhotoName;

        // Move uploaded files to the server
        if (move_uploaded_file($noteFile['tmp_name'], $noteFilePath) && move_uploaded_file($notePhoto['tmp_name'], $notePhotoPath)) {
            // Save note details to the database
            $query = "INSERT INTO uploaded_notes (noteFileName, noteFileURL, notePhotoURL) VALUES (?, ?, ?)";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, 'sss', $noteFileName, $noteFilePath, $notePhotoPath);

            if (mysqli_stmt_execute($stmt)) {
                echo json_encode(['success' => true, 'message' => 'File uploaded successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to insert note into the database']);
            }

            // Close the statement
            mysqli_stmt_close($stmt);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to move uploaded files']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid file types']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Files are not set']);
}

// Close the database connection
mysqli_close($conn);
?>
