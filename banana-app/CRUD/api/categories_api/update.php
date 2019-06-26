<?php

//Headers
header('Access-Control-Allow--Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Category_post.php';

//Instantiate database and connect
$database = new Database();
$db = $database -> connect();

if ($_SERVER['REQUEST_METHOD'] != 'OPTIONS') {
//Instantiate blog post object
$post = new Post($db);

//Get raw posted data 
$data = $_POST;


//Set Id to update
$post->title = $data['title'];
$post->inactive = $data['inactive'];
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
}
