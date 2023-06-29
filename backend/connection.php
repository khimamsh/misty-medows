<?php
class DBConnection {
    private $servername = "localhost";
    private $username = "himamsh";
    private $password = "85334343";
    private $dbname = "vaave";
    protected $conn;
    
    public function __construct() {
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }
    
    public function getConnection() {
        return $this->conn;
    }
}
?>