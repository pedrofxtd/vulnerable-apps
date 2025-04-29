<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $target_dir = "uploads/";
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }

    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file);
    echo "File uploaded to: " . $target_file;
}
?>

<!DOCTYPE html>
<html>
<body>
  <h2>Insecure File Upload</h2>
  <form action="" method="post" enctype="multipart/form-data">
    Select file to upload:<br><br>
    <input type="file" name="fileToUpload"><br><br>
    <input type="submit" value="Upload File">
  </form>
</body>
</html>
