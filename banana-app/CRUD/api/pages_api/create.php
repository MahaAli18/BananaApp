<?php

//Headers
header('Access-Control-Allow--Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Post_page.php';

//Instantiate database and connect
$database = new Database();
$db = $database->connect();

if ($_SERVER['REQUEST_METHOD'] != 'OPTIONS') {
    //Instantiate blog post object
    $post = new Post($db);

    //Get raw posted data 
    $data = $_POST;
    
    $post->title = $data['title'];
    $post->description = $data['description'];
    $post->page_name = strtolower(str_replace(' ', '-', $data['title']));


    if ($post->create()) {
        echo json_encode(
            array('message' => 'Post Created')
        );
    } else {
        echo json_encode(
            array('message' => 'Post Not Created')
        );
    }
}
