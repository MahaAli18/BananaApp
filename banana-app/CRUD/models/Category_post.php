<?php

class Post{
    //DB stuff 
    private $conn;
    private $table = 'categories';

    //post properties
    public $id;
    public $title;
    public $inactive;
  
    //constructor with DB
    public function __construct($db)
    {
         $this->conn =$db;
    }


    //Get Posts
    public function read(){
        //create query
        $query = 'SELECT
        *
        FROM
        ' . $this->table;
        
        ////prepare statement
        $stmt = $this->conn->prepare($query);

        //execute query
        $stmt->execute();

        return $stmt;

    }


    //Get Single post
    public function read_single(){
        $query = 'SELECT
        *
        FROM
        ' . $this->table . ' as p WHERE  p.id = ? LIMIT 0,1';

        ////prepare statement
        $stmt = $this->conn->prepare($query);

        //Bind ID
        $stmt->bindParam(1, $this->id);

         //execute query
         $stmt -> execute();

         $row = $stmt->fetch(PDO::FETCH_ASSOC);

         //set properties
         $this->id = $row['id'];
         $this->title = $row['title'];
         $this->inactive = $row['inactive'];

    }

   
    //Create Post

    public function create(){
        //create query
        $query = 'INSERT INTO '. $this->table .'
        (title, inactive) 
        VALUES 
        (?,?)';

        //prepare statement
        $stmt= $this->conn->prepare($query);

    

        //Bind Parameters
        $stmt -> bindParam(1, $this->title);
        $stmt -> bindValue(2, $this->inactive == "true" ? 1 : 0);
        
    
        if($stmt->execute()){
            return true;
        }
    
        // If something goes wrong print error
        var_dump($stmt->errorInfo());
        return false;
    

        
    }

    //Update Post

     public function update(){
        //create query
        $query = 'UPDATE '. $this->table .' SET title = ?, inactive = ? WHERE id = ?' ;

        //prepare statement
        $stmt= $this->conn->prepare($query);
    

        //Bind Parameters
        $stmt -> bindParam(1, $this->title);
        $stmt -> bindValue(2, $this->inactive == "true" ? 1 : 0);
        $stmt -> bindParam(3, $this->id, PDO::PARAM_INT);

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
    public function read_category_with_posts(){
        $query = 'SELECT a.title as title, a.price as price , a.images as image, a.body as body, b.title as category FROM posts AS a JOIN categories AS b ON b.id=a.category_id';
           
        ////prepare statement
        $stmt = $this->conn->prepare($query);

        //execute query
        $stmt->execute();

        return $stmt;
    }

}

   
?>