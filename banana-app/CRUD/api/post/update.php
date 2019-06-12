<?php

//Headers
header('Access-Control-Allow--Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Post.php';

//Instantiate database and connect
$database = new Database();
$db = $database -> connect();

//Instantiate blog post object
$post = new Post($db);

//Get raw posted data 
$data = $_POST;

if(isset($_FILES["images"])){
chdir('../../../public/');
$currentDir = getcwd();
var_dump($currentDir);
$uploadDirectory = "/images/";

$errors = []; // Store all foreseen and unforseen errors here

$fileExtensions = ['jpeg', 'jpg', 'png']; // Get all the file extensions

$fileName = $_FILES['images']['name'];
$fileSize = $_FILES['images']['size'];
$fileTmpName  = $_FILES['images']['tmp_name'];
$fileType = $_FILES['images']['type'];
$exploded = explode('.', $fileName);
$fileExtension = strtolower(end($exploded));

$uploadPath = $currentDir . $uploadDirectory . basename($fileName);

if (file_exists($uploadPath)) {
    echo "Sorry, file already exists.";
    
}

if (! in_array($fileExtension, $fileExtensions)) {
    $errors[] = "This file extension is not allowed. Please upload a JPEG or PNG file";
}

if ($fileSize > 2000000) {
    $errors[] = "This file is more than 2MB. Sorry, it has to be less than or equal to 2MB";
}

if (empty($errors) ) {

    $didUpload = move_uploaded_file($fileTmpName, $uploadPath);

    if ($didUpload) {
        echo "The file " . basename($fileName) . " has been uploaded";
    } else {
        echo "An error occurred somewhere. Try again or contact the admin";
    }
} else {
    foreach ($errors as $error) {
        echo $error . "These are the errors" . "\n";
    }
}
$images = basename($fileName);
}

else{
    $images = $data['images'];
}
//Set Id to update

$post->title = $data['title'];
$post->body = $data['body'];
$post->price = $data['price'];
$post->images = $images;
$post->id = $data['id'];



//Update Post Method
if($post->update()){
    echo json_encode(
        array('message' => 'Post Updated')
    );
}else {
    echo json_encode(
        array('message' => 'Post Not Updated')
    );
}

