<?php

class Post{
    //DB stuff 
    private $conn;
    private $table = 'posts';

    //post properties
    public $id;
    public $title;
    public $body;
    public $price;
    public $image;

    //constructor with DB
    public function __construct($db)
    {
         $this->conn =$db;
    }

    //Get Posts

    public function read(){
        //create query
        $query = 'SELECT
        p.id,
        p.title,
        p.body,
        p.price,
        p.image
        FROM
        ' . $this->table . ' p
        ';
        
        ////prepare statement
        $stmt = $this->conn->prepare($query);

        //execute query
        $stmt -> execute();

        return $stmt;

    }

    public function read_single(){
        $query = 'SELECT
        p.id,
        p.title,
        p.body,
        p.price,
        p.image
        FROM
        ' . $this->table . ' p
        
        WHERE 
        p.id?
        LIMIT 0,1'
        ;

        ////prepare statement
        $stmt = $this->conn->prepare($query);

        //Bind ID
        $stmt->bindParam(1, $this->id);

         //execute query
         $stmt -> execute();

         $row = $stmt->fetch(PDO::FETCH_ASSOC);

         //set properties
         $this->title = $row['title'];
         $this->body = $row['body'];
         $this->price = $row['price'];
         $this->image = $row['image'];

 


    }

    //Create Post

    public function create(){
        //create query
        $query = 'INSERT INTO '. $this->table .'
        (title, body, price, images) 
        VALUES 
        (?,?,?,?)';

        //prepare statement
        $stmt= $this->conn->prepare($query);

        //clean data
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->body = htmlspecialchars(strip_tags($this->body));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->image = htmlspecialchars(strip_tags($this->image));

        //Bind Parameters
        $stmt -> bindParam(1, $this->title);
        $stmt -> bindParam(2, $this->body);
        $stmt -> bindParam(3, $this->price);
        $stmt -> bindParam(4, $this->image);

        if($stmt->execute()){
            return true;
        }
    
           // if something goes wrong print error
           var_dump($stmt->errorInfo());
            return false;
    

        
    }
}