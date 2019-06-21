<?php

//Headers
header('Access-Control-Allow--Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Post_page.php';

//Instantiate database and connect
$database = new Database();
$db = $database -> connect();

//Instantiate blog post object
$post = new Post($db);

//GET ID
$post->page_name = isset($_GET['page_name']) ? $_GET['page_name'] : die();

//Get Post
$post->read_page();

//create array
$post_arr=array(
  'id' => $post->id,
  'title' => $post->title,
  'description' => $post->description,
  'page_name' => $post->page_name
);

 print_r(json_encode($post_arr));


