<?php

//Headers
header('Access-Control-Allow--Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Post_page.php';

//Instantiate database and connect
$database = new Database();
$db = $database -> connect();

if ($_SERVER['REQUEST_METHOD'] != 'OPTIONS') {
//Instantiate blog post object
$post = new Post($db);

//Get raw posted data 
$data = json_decode(file_get_contents("php://input"));

//Set Id to update
$post->id = $data->id;

var_dump($data);

//Update Post Method
if($post->delete()){
    echo json_encode(
        array('message' => 'Post deleted')
    );
}else {
    echo json_encode(
        array('message' => 'Post Not deleted')
    );
}

}