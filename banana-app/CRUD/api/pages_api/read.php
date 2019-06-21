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

//Blog Post Query
$result = $post->read();

//Number of rows in database
$num = $result->rowCount();


//check if any posts
if($num > 0 ){
    $post_arr=array();
    $post_arr['data']=array();

    while($row = $result ->fetch(PDO::FETCH_ASSOC)){
         $post_item=array(
            'id' => $row['id'],
            'title' => $row['title'],
            'page_name' => $row['page_name']
         );
         array_push($post_arr['data'], $post_item); 

    }
    //Turn to json and output
      echo json_encode($post_arr);
}else{
     
    //No Posts found
    echo json_encode(
        array('message'=> 'No Post Found')
    );
}
