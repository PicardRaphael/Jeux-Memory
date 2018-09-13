<?php
    session_start();
    require(__DIR__.'/classes/DBData.php');
    $dbdata = new DBData();
    $allScore = $dbdata->getScores();
    
    $name = '';
    $score = '';
    $password = '';
    
    if (!empty($_POST)) {
        // Récupération des valeurs du formulaire dans des variables
        $name = isset($_POST['name']) ? $_POST['name'] : '';
        $password = isset($_POST['password']) ? $_POST['password'] : '';
        
        //$password = password_hash($password, PASSWORD_DEFAULT);

        if (empty($name)) {
          $errorList[] = 'Le nom est vide';
        }
        // Je vérifie que ma variable n'est pas vide
        if (empty($password)) {
          $errorList[] = 'L\'éditeur est vide';
        }
    
        // Si ma liste d'erreur est vide, ce que je n'ai pas d'erreur !
        // Je peux donc inserer ma donnée
        if (empty($errorList)) {
          $user = $dbdata->getUser($name, $password);

          if (!$user)
          {
              $dbdata->setUser($name, $password);
              header('Location: game.php');
          }
          else
          {
              if($user['password'] === $password){
                $_SESSION['id'] = $user['id'];
                $_SESSION['name'] = $name;
                header('Location: game.php');
              }else{
                $errorList[] = 'Mauvais mot de passe';
              }
          } 
          
    
        }
    }
    require(__DIR__.'/view/accueil.phtml');
?>