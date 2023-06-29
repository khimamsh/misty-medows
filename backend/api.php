
<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require_once 'connection.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);
class Api {

    private $connection;
    private  $response = array();

    public function __construct($connection)
    {
        $this->connection=$connection;
    }


    public function getQuestions($topic){
        $combinedResult = array();
         $conn = $this->connection->getConnection();
         
        $query1 = "SELECT*FROM questions_pool WHERE level ='beginner' AND topic = '$topic' ORDER BY RAND() LIMIT 4";
        $result1 = $conn->query($query1);

        $query2 = "SELECT * FROM questions_pool WHERE level = 'intermediate' AND topic = '$topic' ORDER BY RAND() LIMIT 3";
        $result2 = $conn->query($query2);

        $query3 = "SELECT * FROM questions_pool WHERE level = 'advanced' AND topic = '$topic' ORDER BY RAND() LIMIT 3";
        $result3 = $conn->query($query3);



        if ($result1 && $result2 && $result3) {
            while ($row = $result1->fetch_assoc()) {
                $combinedResult[] = $row;
            }
            while ($row = $result2->fetch_assoc()) {
                $combinedResult[] = $row;
            }
            while ($row = $result3->fetch_assoc()) {
                $combinedResult[] = $row;
            }
            return $combinedResult;
        }
    }

    public function getTopics(){
        $conns = $this->connection->getConnection();
        $sqlStmt= 'SELECT * FROM topics';
        $result = $conns->query($sqlStmt);
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
        $conns->close();
        return $response;
    }
}
$connection = new DBConnection();

$instance = new Api($connection);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
if (isset($_GET['type'])) {
    $type = $_GET['type'];
    if(isset($_GET['topic'])){
        $topic = $_GET['topic'];
        if ($type === 'exam') {
            $res = $instance->getQuestions($topic);
            $json = json_encode($res);
            header('Content-Type: application/json');
            echo $json;
        }   

    }
    if($type==='topics'){
        $res=$instance->getTopics();
        $json = json_encode($res);
        header('Content-Type: application/json');
        echo $json;
        }
   
}else{
    // Convert the result to JSON format
    $response['error'] = true; 
    $response['message'] = 'Invalid API Call';
    

    echo json_encode($response);
}
}
else{
    $response['error'] = true; 
    $response['message'] = 'Invalid API Call';
    

    echo json_encode($response);
}

?>