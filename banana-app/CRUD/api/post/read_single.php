<?php

//Headers
header('Access-Control-Allow--Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Post.php';

//Instantiate database and connect
$database = new Database();
$db = $database -> connect();

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
  'body' => $post->body,
  'price' => $post->price,
  'images' => $post->images,
  'category_id' => (int)$post->category_id
);



 print_r(json_encode($post_arr));


