<?php

class Post{
    //DB stuff 
    private $conn;
    private $table = 'pages';

    //post properties
    public $id;
    public $title;
    public $description;
    public $page_name;

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
        p.description,
        p.page_name,
        FROM
        ' . $this->table . ' as p';
        
        ////prepare statement
        $stmt = $this->conn->prepare($query);

        //execute query
        $stmt -> execute();

        return $stmt;

    }


    //Get Single post
    public function read_single(){
        $query = 'SELECT
        p.id,
        p.title,
        p.description,
        p.page_name,
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
         $this->description = $row['description'];
         $this->page_name = $row['page_name'];

    }
    //Create Post

    public function create(){
        //create query
        $query = 'INSERT INTO '. $this->table .'
        (title, description, page_name) 
        VALUES 
        (?,?,?)';

        //prepare statement
        $stmt= $this->conn->prepare($query);

        //clean data
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->page_name = htmlspecialchars(strip_tags($this->page_name));
    

        //Bind Parameters
        $stmt -> bindParam(1, $this->title);
        $stmt -> bindParam(2, $this->description);
        $stmt -> bindParam(3, $this->page_name);
    

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
        $query = 'UPDATE '. $this->table .' SET title = ?, description = ?, page_name = ? WHERE id = ?' ;

        //prepare statement
        $stmt= $this->conn->prepare($query);

        //clean data
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->page_name = htmlspecialchars(strip_tags($this->page_name));
    

        //Bind Parameters
        $stmt -> bindParam(1, $this->title);
        $stmt -> bindParam(2, $this->description);
        $stmt -> bindParam(3, $this->page_name);
        $stmt -> bindParam(5, $this->id, PDO::PARAM_INT);

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


}

    ?>