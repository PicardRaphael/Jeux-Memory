<?php
session_start();


require(__DIR__.'/classes/DBData.php');
$dbdata = new DBData();


if(!empty($_GET["best_score"])){
  $dbdata->setScores($_SESSION['id'], $_GET["best_score"]);
}

require(__DIR__.'/view/game.phtml');

