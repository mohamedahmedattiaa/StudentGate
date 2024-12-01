<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['profile_pic'])) {
    $uploadDir = 'uploads/';
    $uploadFile = $uploadDir . basename($_FILES['profile_pic']['name']);

    if (move_uploaded_file($_FILES['profile_pic']['tmp_name'], $uploadFile)) {
        echo "File uploaded successfully!";
    } else {
        echo "File upload failed!";
    }
}
?>
