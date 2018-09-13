<?php
class DBData {
  private $pdo;
  public function __construct() {
    $dsn = 'mysql:dbname=memory;host=localhost;charset=UTF8';
    $username = 'memory';
    $password = 'memory';
    try {
        $this->pdo = new PDO(
            $dsn,
            $username,
            $password,
            array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING)
        );
    }
    catch (PDOException $e) {
        die('Connection failed');
    }
  }

  // Méthode getScore: Permet de retourner tableau des scores.
  public function getScores() {
    $sql = "SELECT *,
              user.name AS 'user_name'
              FROM score
              INNER JOIN user
              ON score.user_id = user.id 
              ORDER BY `best_score` ASC "; 
            

    $pdoStatement = $this->pdo->query($sql);
    $allScore = $pdoStatement->fetchAll(PDO::FETCH_ASSOC);
    return $allScore;
  }
  
  public function setScores($id, $score) {
   $insertQuery ="INSERT INTO score (user_id,best_score)
              VALUE ('{$id}', '{$score}')";
    $insertUser = $this->pdo->exec($insertQuery);
  }

  public function setUser($name, $password){
    $insertQuery ="INSERT INTO user (name,password)
              VALUE ('{$name}', '{$password}')";
    $insertUser = $this->pdo->exec($insertQuery);
  }

  public function getUser($name, $password){
    //  Récupération de l'utilisateur et de son pass hashé
    $req = $this->pdo->prepare("SELECT user.id, user.password FROM user WHERE user.name = '{$name}' AND user.password = '{$password}'");
    $req->execute(array(
        'name' => $name));
    $user = $req->fetch();
    return $user;
  }
}
?>