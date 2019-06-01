<?php

class Database{
    //DB PARAMS

    private $host='localhost';
    private $db_name='myblog';
    private $username ='root';
    private $password = '';
    private $conn;

    public function connect(){
        $this->conn=null;

        try{
           $this->conn = new PDO('mysql:host=' .$this->host. ';dbname=' .$this->db_name, $this->username, $this->password);
        }catch(PDOException $e){
            echo 'connection error :' .$e->getMessage();
        }
        return $this->conn;
    }
}