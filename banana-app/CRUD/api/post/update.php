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
$data = json_decode(file_get_contents("php://input"));

//Set Id to update
$post->id = $data->id;

$post->title = $data->title;
$post->body = $data->body;
$post->price = $data->price;
$post->image = $data->image;

var_dump($data);

//Update Post Method
if($post->update()){
    echo json_encode(
        array('message' => 'Post Update')
    );
}else {
    echo json_encode(
        array('message' => 'Post Not Updated')
    );
}

