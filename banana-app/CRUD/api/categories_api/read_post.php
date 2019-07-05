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

//Blog Post Query
$result = $post->read_category_with_posts();

//Number of rows in database
$num = $result->rowCount();


//check if any posts
if($num > 0 ){
    $post_arr = [];
    $output = [];

    while($row = $result ->fetch(PDO::FETCH_ASSOC)){
        $post_arr[ $row['category'] ][] = [
            'title' => $row['title'],
            'price' => $row['price'],
            'image' => $row['image'],
            'body' => html_entity_decode($row['body']),
        ];
    }

    foreach($post_arr as $key => $item)
    {
        $output[] = [
            'title' => $key,
            'products' => $item
        ];
    }
    //Turn to json and output
      echo json_encode($output);
}else{
    //No Posts found
    echo json_encode(
        array('message'=> 'No Post Found')
    );
}

}