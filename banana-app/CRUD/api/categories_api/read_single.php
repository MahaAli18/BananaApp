<?php

//Headers
header('Access-Control-Allow--Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Category_post.php';

//Instantiate database and connect
$database = new Database();
$db = $database -> connect();

if ($_SERVER['REQUEST_METHOD'] != 'OPTIONS') {
//Instantiate blog post object
$post = new Post($db);

//GET ID
$post->id = isset($_GET['id']) ? $_GET['id'] : die();

//Get Post
$post->read_single();

//create array
$post_arr=array(
  'id' => $post->id,
  'title' => $post->title,
  'inactive' => $post->inactive
  
);

 print_r(json_encode($post_arr));
}

