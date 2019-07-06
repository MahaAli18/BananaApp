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
    public $images;
    public $category_id;
    public $featured;

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
        p.images,
        p.category_id,
        p.featured
        FROM
        ' . $this->table . ' as p';
        
        ////prepare statement
        $stmt = $this->conn->prepare($query);

        //execute query
        $stmt -> execute();

        return $stmt;

    }


    //Get Single post
    public function read_single()
    {
        $query = 'SELECT
        id,
        title,
        body,
        price,
        images,
        category_id,
        featured

        FROM
        ' . $this->table . ' WHERE  id = ? LIMIT 0,1';

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
         $this->images = $row['images'];
         $this->category_id = $row['category_id'];
         $this->featured = $row['featured'];
    }

    //Create Post
    public function create(){
        //create query
        $query = 'INSERT INTO '. $this->table .'
        (title, body, price, images, category_id, featured) 
        VALUES 
        (?,?,?,?,?,?)';

        //prepare statement
        $stmt= $this->conn->prepare($query);

        //clean data
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->body = htmlspecialchars(strip_tags($this->body));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->images = htmlspecialchars(strip_tags($this->images));
        $this->category_id = htmlspecialchars(strip_tags($this->category_id));
        $this->featured = htmlspecialchars(strip_tags($this->featured));
    

        //Bind Parameters
        $stmt -> bindParam(1, $this->title);
        $stmt -> bindParam(2, $this->body);
        $stmt -> bindParam(3, $this->price);
        $stmt -> bindParam(4, $this->images);
        $stmt -> bindParam(5, $this->category_id);
        $stmt -> bindValue(6, $this->featured == "true" ? 1 : 0 );

        if($stmt->execute()){
            return true;
        }
    
           // if something goes wrong print error
           var_dump($stmt->errorInfo());
            return false;
    

        
    }

    //Update Post

     public function update(){
        //create query
        $query = 'UPDATE '. $this->table .' SET title = ?, body = ?, price = ?, images = ? , category_id = ? , featured = ? WHERE id = ?' ;

        //prepare statement
        $stmt= $this->conn->prepare($query);

        //clean data
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->body = htmlspecialchars(strip_tags($this->body));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->images = htmlspecialchars(strip_tags($this->images));
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->category_id = htmlspecialchars(strip_tags($this->category_id));
        $this->featured = htmlspecialchars(strip_tags($this->featured));


        //Bind Parameters
        $stmt -> bindParam(1, $this->title);
        $stmt -> bindParam(2, $this->body);
        $stmt -> bindParam(3, $this->price);
        $stmt -> bindParam(4, $this->images);
        $stmt -> bindParam(7, $this->id, PDO::PARAM_INT);
        $stmt -> bindParam(5, $this->category_id);
        $stmt -> bindValue(6, $this->featured == "true" ? 1 : 0 );

        var_dump($stmt->queryString);
        if($stmt->execute()){
            return true;
        }
    
           // if something goes wrong print error
           var_dump($stmt->errorInfo());
            return false;
    }


    ///Delete Post///

    public function delete(){
        chdir('../../../public/');
        $currentDir = getcwd();
        $uploadDirectory = "/images/";

        $res = 'SELECT * FROM '. $this->table .' WHERE id = ?';

        ////prepare statement
        $del = $this->conn->prepare($res);

        //Bind ID
        $del->bindParam(1, $this->id);

         //execute query
        $del -> execute();

        $row = $del->fetch(PDO::FETCH_ASSOC);

        $uploadPath = $currentDir . $uploadDirectory . $row['images'];

        var_dump($uploadPath);

            if (file_exists($uploadPath)) {
              unlink($uploadPath);
              echo 'File '.$uploadPath.' has been deleted';
            } else {
              echo 'Could not delete '.$uploadPath.', file does not exist';
            }

   
      
        $query = 'DELETE FROM '. $this->table .' WHERE id = ? ';

          //prepare statement
          $stmt= $this->conn->prepare($query);

          $this->id = htmlspecialchars(strip_tags($this->id));

          $stmt->bindParam(1, $this->id, PDO::PARAM_INT);

          if($stmt->execute()){
            return true;
        }
    
           // if something goes wrong print error
           var_dump($stmt->errorInfo());
            return false;
        return true;

    }

    public function read_featured_posts(){
        $query = 'SELECT a.title as title, a.price as price , a.images as image, a.body as body FROM posts as a Where featured = 1';
           
        ////prepare statement
        $stmt = $this->conn->prepare($query);

        //execute query
        $stmt->execute();

        return $stmt;
    }


    
}