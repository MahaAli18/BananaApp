<?php

//Headers
header('Access-Control-Allow--Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/post.php';

//Instantiate database and connect
$database = new Database();
$db = $database -> connect();

if ($_SERVER['REQUEST_METHOD'] != 'OPTIONS') {
//Instantiate blog post object
$post = new Post($db);

//Blog Post Query
$result = $post->read_featured_posts();

//Number of rows in database
$num = $result->rowCount();


//check if any posts

if($num > 0 ){
    $post_arr=array();
    $post_arr['data']=array();

    while($row = $result ->fetch(PDO::FETCH_ASSOC)){
         $post_item=array(
            'title' => $row['title'],
            'price' => $row['price'],
            'image' => $row['image'],
            'body' => html_entity_decode($row['body']),
         );
         array_push($post_arr['data'], $post_item); 

    }
    echo json_encode( $post_arr['data']);

}else{
    //No Posts found
    echo json_encode(
        array('message'=> 'No Post Found')
    );
}

}